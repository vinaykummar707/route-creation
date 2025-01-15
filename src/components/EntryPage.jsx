import { useEffect, useState } from "react";
import BusRoutes from "./BusRoutes";
import RouteDisplaySettings from "./RouteDisplaySettings";
import RouteLanguageSettings from "./RouteLanguageSettings";
import axios from "axios";

const EntryPage = () => {
  const [route, setRoute] = useState({
    routeNumber: "",
    source: "",
    destination: "",
    separation: "",
    via: "",
  });

  const handleRouteChange = (e) => {
    const { name, value } = e.target;
    setRoute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const languageOptions = {
    languages: ["English", "Hindi", "Marathi", "Telugu"],
    fontSize: 20,
    fontWeights: ["regular", "bold"],
  };

  const [languageConfig, setLanguageConfig] = useState([
    {
      language: "English",
      fontSize: 16,
      fontWeight: "regular",
    },
    {
      language: "Hindi",
      fontSize: 16,
      fontWeight: "regular",
    },
    {
      language: "Telugu",
      fontSize: 16,
      fontWeight: "regular",
    },
  ]);

  const handleLanguageConfigChange = (index, field, value) => {
    if (field === "fontSize") {
      setLanguageConfig((prev) => {
        const newConfig = [...prev];
        newConfig[index] = {
          ...newConfig[index],
          [field]: Number(value),
        };
        return newConfig;
      });
    } else {
      setLanguageConfig((prev) => {
        const newConfig = [...prev];
        newConfig[index] = {
          ...newConfig[index],
          [field]: value,
        };
        return newConfig;
      });
    }
  };

  const languageMapping = {
    English: "en", // ISO code for English
    Hindi: "hi", // ISO code for Hindi
    Telugu: "te",
    Marathi: "mr", // ISO code for Telugu
  };

  const [displayConfig, setDisplayConfig] = useState({
    front: {},
    side: {},
    rear: {},
    internal: {},
  });

  const handleConfigChange = (display, config) => {
    console.log(display, config);

    setDisplayConfig((prev) => {
      const newConfig = { ...prev };
      newConfig[display] = config;
      return newConfig;
    });
  };

  useEffect(() => {
    // console.log(route);
    // console.log(languageConfig);
    console.log(displayConfig);
  }, [route, languageConfig, displayConfig]);

  async function translateText(text, srcLang, destLang) {
    const API_URL = "https://api.devnagri.com/machine-translation/v2/translate";
    const API_KEY = "devnagri_9b97bc1ad2ff11efbac242010aa00fc7"; // Replace with your actual API key

    try {
      const formData = new FormData();
      formData.append("key", API_KEY);
      formData.append("sentence", text);
      formData.append("src_lang", srcLang);
      formData.append("dest_lang", destLang);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data.translated_text; // Return the translated text if success
      } else {
        console.error("Translation API Error:", response.data.msg);
        return text; // Fallback to original text in case of error
      }
    } catch (error) {
      console.error("API Request Failed:", error.message);
      return text; // Fallback to original text
    }
  }

  async function showFinalJson() {
    // Use an empty object to accumulate the final config
    const config = {};

    // Iterate over the languageSettings to fetch the translated configurations
    const configPromises = languageConfig.map(async (language) => {
      const targetLanguage = languageMapping[language.language]; // Map language to ISO code

      if (!targetLanguage) {
        console.error(`No mapping found for language: ${language.language}`);
        return null; // Skip if no mapping is found
      }

      const translatedConfig = {};

      for (const key of Object.keys(displayConfig)) {
        const originalText = displayConfig[key]?.text;
        let translatedText = originalText;

        if (originalText && targetLanguage !== "en" && isNaN(originalText)) {
          // Call translation API only if the target language is not English
          translatedText = await translateText(
            originalText,
            "en",
            targetLanguage
          );
        }

        if (originalText) {
          // Only include fontSize and fontWeight if text is present
          translatedConfig[key] = {
            ...displayConfig[key],
            text: translatedText, // Always include text if present
            fontSize: language.fontSize,
            fontWeight: language.fontWeight,
          };
        } else {
          // Include other properties without fontSize and fontWeight
          translatedConfig[key] = {
            ...displayConfig[key],
          };
        }
      }

      // Merge the translated config directly into the final config object
      if (translatedConfig) {
        config[language.language] = translatedConfig;
      }
    });

    // Wait for all promises to resolve and then log the final config
    await Promise.all(configPromises);

    console.log({ ...route, displayConfig: config });
    generateJson({ ...route, displayConfig: config }); // The final config will be in the correct format now
  }

  const generateJson = (configData) => {
    // Convert to JSON string with proper formatting
    const jsonString = JSON.stringify(configData, null, 2);

    // Create blob and download link
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `route_config_${route.routeNumber || "new"}_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also log to console for reference
    console.log("Configuration Saved:", configData);
  };

  return (
    <>
      <BusRoutes route={route} onRouteChange={handleRouteChange} />
      <RouteLanguageSettings
        languageOptions={languageOptions}
        languageConfig={languageConfig}
        handleLanguageConfigChange={handleLanguageConfigChange}
      />
      <RouteDisplaySettings
        route={route}
        displayConfig={displayConfig}
        handleConfigChange={handleConfigChange}
      />

      <button
        onClick={showFinalJson}
        className="bg-indigo-600 text-sm p-3 self-start text-white rounded-lg"
      >
        Export To Json
      </button>
    </>
  );
};

export default EntryPage;
