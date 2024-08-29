import { useState, useRef } from 'react';

export default function ShadowGenerator() {
    const [offsetX, setOffsetX] = useState(10);
    const [offsetY, setOffsetY] = useState(10);
    const [blurRadius, setBlurRadius] = useState(10);
    const [spreadRadius, setSpreadRadius] = useState(0);
    const [color, setColor] = useState('#D9D9D9');
    const [buttonText, setButtonText] = useState('Copy');

    const colorInputRef = useRef(null);

    const shadowStyle = {
        boxShadow: `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`,
    };

    const handleColorBoxClick = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    };

    const shadowCode = `box-shadow: ${shadowStyle.boxShadow};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shadowCode)
            .then(() => {
                setButtonText('Copied!');
                setTimeout(() => setButtonText('Copy'), 2000); // Reset button text after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto mt-8 md:mt-8 lg:mt-12" id='shadow'>
                {/* Shadow Control Center */}
                <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg border border-gray-200" style={{ borderRadius: '30px' }}>
                    <h2 className="text-2xl font-bold mb-6 text-blue-800">Shadow Generator</h2>
                    <div className="grid gap-6">
                        {/* First Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-blue-600">Offset X:</label>
                                <input
                                    type="number"
                                    value={offsetX}
                                    onChange={(e) => setOffsetX(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-blue-600">Offset Y:</label>
                                <input
                                    type="number"
                                    value={offsetY}
                                    onChange={(e) => setOffsetY(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-blue-600">Blur Radius:</label>
                                <input
                                    type="number"
                                    value={blurRadius}
                                    onChange={(e) => setBlurRadius(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-blue-600">Spread Radius:</label>
                                <input
                                    type="number"
                                    value={spreadRadius}
                                    onChange={(e) => setSpreadRadius(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Third Row */}
                        <div className="flex flex-col gap-2">
                            <label className="text-blue-600">Color:</label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    ref={colorInputRef}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    aria-label="Choose color"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                                    style={{ backgroundColor: color }}
                                    onClick={handleColorBoxClick}
                                >
                                    <span
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shadow Preview */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div
                        className="w-full h-64 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-custom"
                        style={{ ...shadowStyle, width: 'auto', maxWidth: '100%', aspectRatio: '1 / 1', borderRadius: '30px' }}
                    >
                        <span className="text-blue-600 text-lg font-medium">Shadow Preview</span>
                    </div>
                </div>

                {/* Shadow Code */}
                <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col" style={{ borderRadius: '30px', height: '350px' }}>
                    <h2 className="text-2xl font-bold mb-4 text-blue-800 px-8 pt-6">Generated Code</h2>
                    <div className="flex flex-col flex-1 px-8 pb-4">
                        <pre className="whitespace-pre-wrap break-words text-blue-800 overflow-auto flex-1">{shadowCode}</pre>
                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4 w-full"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>

            {/* Blue Horizontal Line */}
            <div className="border-t-4 border-[#2563eb] mt-[20px]"></div>
        </>
    );
}
