import { useState, useRef } from 'react';

export default function GradientGenerator() {
    const [color1, setColor1] = useState('#FF7E5F');
    const [color2, setColor2] = useState('#FFBB00');
    const [direction, setDirection] = useState('to right');
    const [buttonText, setButtonText] = useState('Copy');

    const colorInputRef1 = useRef(null);
    const colorInputRef2 = useRef(null);

    const gradientStyle = {
        background: `linear-gradient(${direction}, ${color1}, ${color2})`,
    };

    const handleColorBoxClick = (ref) => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const gradientCode = `background: linear-gradient(${direction}, ${color1}, ${color2});`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(gradientCode)
            .then(() => {
                setButtonText('Copied!');
                setTimeout(() => setButtonText('Copy'), 2000); // Reset button text after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-4" id='gradient'>
            {/* Gradient Control Center */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg border border-gray-200" style={{ borderRadius: '30px' }}>
                <h2 className="text-2xl font-bold mb-6 text-blue-800">Gradient Generator</h2>
                <div className="grid gap-6">
                    {/* Colors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-blue-600">Color 1:</label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={color1}
                                    onChange={(e) => setColor1(e.target.value)}
                                    ref={colorInputRef1}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    aria-label="Choose color 1"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                                    style={{ backgroundColor: color1 }}
                                    onClick={() => handleColorBoxClick(colorInputRef1)}
                                >
                                    <span
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: color1 }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-blue-600">Color 2:</label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={color2}
                                    onChange={(e) => setColor2(e.target.value)}
                                    ref={colorInputRef2}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    aria-label="Choose color 2"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                                    style={{ backgroundColor: color2 }}
                                    onClick={() => handleColorBoxClick(colorInputRef2)}
                                >
                                    <span
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: color2 }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Direction */}
                    <div className="flex flex-col gap-2">
                        <label className="text-blue-600">Direction:</label>
                        <select
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="to right">To Right</option>
                            <option value="to left">To Left</option>
                            <option value="to top">To Top</option>
                            <option value="to bottom">To Bottom</option>
                            <option value="to top right">To Top Right</option>
                            <option value="to bottom right">To Bottom Right</option>
                            <option value="to bottom left">To Bottom Left</option>
                            <option value="to top left">To Top Left</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Gradient Preview */}
            <div className="w-full md:w-1/3 flex items-center justify-center">
                <div
                    className="w-full h-64 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-custom"
                    style={{ ...gradientStyle, width: 'auto', maxWidth: '100%', aspectRatio: '1 / 1', borderRadius: '30px' }}
                >
                    <span className="text-blue-600 text-lg font-medium">Gradient Preview</span>
                </div>
            </div>

            {/* Gradient Code */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col" style={{ borderRadius: '30px', height: '350px' }}>
                <h2 className="text-2xl font-bold mb-4 text-blue-800 px-8 pt-6">Generated Code</h2>
                <div className="flex flex-col flex-1 px-8 pb-4">
                    <pre className="whitespace-pre-wrap break-words text-blue-800 overflow-auto flex-1 text-left">{gradientCode}</pre>
                    <div className="flex justify-start mt-4">
                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
