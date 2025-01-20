import { useCallback, useEffect, useState } from "react";
import BusRoutes from "./BusRoutes";
import RouteDisplaySettings from "./RouteDisplaySettings";
import RouteLanguageSettings from "./RouteLanguageSettings";
import axios from "axios";
import Bus from "./test";
import SimulationDialog from "./SimulationDialog";

const EntryPage = () => {
  const [route, setRoute] = useState({
    routeNumber: "300",
    source: "UPPAL",
    destination: "MEHDIPATNAM",
    separation: "TO",
    via: "VIA: ARAMGHAR,LB NAGAR,VANASTHALIPURAM",
    splitRoute: false,
    routeNumberUpperHalf: "300",
    routeNumberLowerHalf: "2A",
  });

  const handleRouteChange = (e) => {
    const { name, value, checked } = e.target;
    // console.log(name, value, checked);

    if (name === "splitRoute") {
      setRoute((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setRoute((prev) => ({
        ...prev,
        [name]: value.toUpperCase(),
      }));
    }
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

  const [selectedBoardLanguage, setSelectedBoardLanguage] = useState(
    languageConfig[0].language
  );

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

  const [displayConfig, setDisplayConfig] = useState({});

  useEffect(() => {
    console.log(displayConfig);
  }, [displayConfig]);

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
        const formatConfig = displayConfig[key]; // Current format configuration
        const translatedFormatConfig = { ...formatConfig }; // Copy format config to avoid mutation

        // Translate all text-related fields
        for (const field of [
          "text",
          "sideText",
          "upperHalfText",
          "lowerHalfText",
        ]) {
          const originalText = formatConfig[field];
          if (originalText && targetLanguage !== "en" && isNaN(originalText)) {
            // Translate only if text exists, target language is not English, and it's not a number
            translatedFormatConfig[field] = await translateText(
              originalText,
              "en",
              targetLanguage
            );
          }
        }

        // Add fontSize and fontWeight for text-containing configurations
        if (
          formatConfig.text ||
          formatConfig.sideText ||
          formatConfig.upperHalfText ||
          formatConfig.lowerHalfText
        ) {
          translatedFormatConfig.fontSize = language.fontSize;
          translatedFormatConfig.fontWeight = language.fontWeight;
        }

        // Add the translated format config to the final config
        translatedConfig[key] = translatedFormatConfig;
      }

      // Merge the translated config directly into the final config object
      if (translatedConfig) {
        config[language.language] = translatedConfig;
      }
    });

    // Wait for all promises to resolve and then log the final config
    await Promise.all(configPromises);
    console.log(config);

    setFinalObj({ ...route, displayConfig: config });

    setShowSimulation(true);

    return { ...route, displayConfig: config };

    // generateJson({ ...route, displayConfig: config }); // The final config will be in the correct format now
  }

  const generateJson = () => {
    // Convert to JSON string with proper formatting
    const jsonString = JSON.stringify(finalObj, null, 2);

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
  const handleUpdateDisplaySettings = useCallback(
    (newConfig) => setDisplayConfig(newConfig),
    []
  );

  const [showSimulation, setShowSimulation] = useState(false);
  const [finalObj, setFinalObj] = useState({});

  const changeBoardLanguage = ({ target }) => {
    setSelectedBoardLanguage(target.value);
  };

  return (
    <>
      <BusRoutes route={route} onRouteChange={handleRouteChange} />
      <RouteLanguageSettings
        languageOptions={languageOptions}
        languageConfig={languageConfig}
        handleLanguageConfigChange={handleLanguageConfigChange}
      />

      <Bus
        route={route}
        onUpdateDisplaySettings={handleUpdateDisplaySettings}
        languageConfig={languageConfig}
        // onBoardLanugageChange={handleBoardLanguageChange}
        // selectedBoardLanguage={selectedBoardLanguage}
      />

      {displayConfig && showSimulation && (
        <SimulationDialog
          route={route}
          showSimulation={showSimulation}
          displayConfig={finalObj["displayConfig"]}
          closeSimulation={() => setShowSimulation(false)}
        />
      )}
      <div className="grid grid-cols-6 gap-x-4">
        <button
          onClick={showFinalJson}
          className=" px-4 py-2 bg-indigo-600 text-white text-md rounded-lg"
        >
          Start Simulation
        </button>

        <button
          onClick={generateJson}
          className="bg-green-600 text-sm p-3 self-starts text-white rounded-lg"
        >
          Export To Drive
        </button>
      </div>
    </>
  );
};

export default EntryPage;
