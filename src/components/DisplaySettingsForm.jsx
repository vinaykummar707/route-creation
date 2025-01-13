import * as Tabs from '@radix-ui/react-tabs';
import * as RadioGroup from '@radix-ui/react-radio-group';

const DisplaySettingsForm = () => {
	return (
		<div className="">
			<Tabs.Root defaultValue="front" className=" w-full">
				<div className="border-b border-gray-200 mb-6">
					<Tabs.List className="flex space-x-8" aria-label="Display Boards">
						{/* {boards.map((board) => (
							<Tabs.Trigger
								key={board}
								value={board}
								className="px-1 py-3 text-sm bg-white font-medium text-gray-500 hover:text-gray-800 focus:outline-none data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium"
							>
								<div className="flex items-center space-x-2">
									<span>
										{board.charAt(0).toUpperCase() + board.slice(1)} Display
									</span>
								</div>
							</Tabs.Trigger>
						))} */}
					</Tabs.List>
				</div>

				{/* {boards.map((board) => (
					<Tabs.Content
						key={board}
						value={board}
						className="outline-none w-full"
					>
						{/* <div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">
									{board.charAt(0).toUpperCase() + board.slice(1)} Board
									Configuration
								</h3>
							</div> 

						<div className="w-full">
							<RadioGroup.Root
								value={selectedFields[board]}
								onValueChange={(value) =>
									setSelectedFields((prev) => ({ ...prev, [board]: value }))
								}
								className="flex flex-wrap gap-4 mb-6"
							>
								{fields.map((field) => (
									<div key={field} className="flex items-center">
										<RadioGroup.Item
											value={field}
											id={`${board}-${field}`}
											className="w-4 h-4 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
										>
											<RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-white" />
										</RadioGroup.Item>
										<label
											htmlFor={`${board}-${field}`}
											className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
										>
											{field.charAt(0).toUpperCase() + field.slice(1)}
										</label>
									</div>
								))}
							</RadioGroup.Root>
						</div>
						{selectedFields[board] && (
							<DisplayConfigSection
								board={board}
								field={selectedFields[board]}
							/>
						)}

						<LedSignBoard
							initialBusNumber={displayConfig[board]['routeNumber']['text']}
							initialTopText={`${displayConfig[board]['source']['text']} ${selectedRoute.separation} ${displayConfig[board]['destination']['text']}`}
							initialBottomText={displayConfig[board]['via']['text']}
							upperHalfScrollSpeed={
								displayConfig[board]['source']['scrollSpeed']
							}
							lowerHalfScrollSpeed={displayConfig[board]['via']['scrollSpeed']}
							upperHalfScrollType={displayConfig[board]['source']['scrollType']}
							lowerHalfScrollType={displayConfig[board]['via']['scrollType']}
						/>
					</Tabs.Content>
				))} */}
			</Tabs.Root>
			{/* 
			<button
				onClick={saveDisplayConfig}
				className="bg-neutral-900 text-sm p-2 text-white rounded-lg"
			>
				Save Language Settings
			</button> */}
		</div>
	);
};

export default DisplaySettingsForm;
