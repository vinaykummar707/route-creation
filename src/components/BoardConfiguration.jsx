const BoardConfiguration = ({ value, onBoardFormatChange }) => {
	const displayOptions = {
		boardDisplayFormats: ['Fullscreen', 'TwoTexts', 'ThreeTexts'],
	};

	return (
		<div className="grid">
			<div className="flex mt-4 flex-col gap-3">
				<label className="text-sm font-semibold text-neutral-900" htmlFor="">
					Select Board Format
				</label>
				<select
					name="depotId"
					className="border text-neutral-400 text-sm font-normal p-2 rounded-lg"
					required
					defaultValue={value}
					onChange={({ target }) => {
						onBoardFormatChange(target.value);
					}}
				>
					<option></option>
					{displayOptions.boardDisplayFormats.map((format) => (
						<option key={format} value={format}>
							{format}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default BoardConfiguration;
