import { useState, useRef } from 'react';

export default function GlassmorphismGenerator() {
    const [blur, setBlur] = useState(10);
    const [opacity, setOpacity] = useState(0.2);
    const [backgroundColor, setBackgroundColor] = useState('rgba(217, 217, 217, 1)');
    const [borderColor, setBorderColor] = useState('rgba(217, 217, 217, 1)');
    const [buttonText, setButtonText] = useState('Copy');

    const colorInputRef = useRef(null);

    const glassStyle = {
        backdropFilter: `blur(${blur}px)`,
        backgroundColor,
        opacity,
        border: `1px solid ${borderColor}`,
    };

    const handleColorBoxClick = (ref) => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const glassCode = `
        backdrop-filter: blur(${blur}px);
        background-color: ${backgroundColor};
        opacity: ${opacity};
        border: 1px solid ${borderColor};
    `;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(glassCode)
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
            <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto mt-4 sm:mt-8 md:mt-12 lg:mt-4" id='glass'>
                {/* Glassmorphism Control Center */}
                <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg border border-gray-200" style={{ borderRadius: '30px' }}>
                    <h2 className="text-2xl font-bold mb-6 text-blue-800">Glassmorphism Generator</h2>
                    <div className="grid gap-6">
                        {/* Blur Radius and Opacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blur Radius */}
                            <div className="flex flex-col gap-2">
                                <label className="text-blue-600">Blur Radius:</label>
                                <input
                                    type="number"
                                    value={blur}
                                    onChange={(e) => setBlur(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Opacity */}
                            <div className="flex flex-col gap-2">
                                <label className="text-blue-600">Opacity:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    value={opacity}
                                    onChange={(e) => setOpacity(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Background Color */}
                        <div className="flex flex-col gap-2">
                            <label className="text-blue-600">Background Color:</label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    ref={colorInputRef}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    aria-label="Choose background color"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                                    style={{ backgroundColor: backgroundColor }}
                                    onClick={() => handleColorBoxClick(colorInputRef)}
                                >
                                    <span
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: backgroundColor }}
                                    ></span>
                                </div>
                            </div>
                        </div>

                        {/* Border Color */}
                        <div className="flex flex-col gap-2">
                            <label className="text-blue-600">Border Color:</label>
                            <div className="relative">
                                <input
                                    type="color"
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    ref={colorInputRef}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    aria-label="Choose border color"
                                />
                                <div
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                                    style={{ backgroundColor: borderColor }}
                                    onClick={() => handleColorBoxClick(colorInputRef)}
                                >
                                    <span
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: borderColor }}
                                    ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glassmorphism Preview */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div
                        className="w-full h-64 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-custom"
                        style={{ ...glassStyle, width: 'auto', maxWidth: '100%', aspectRatio: '1 / 1', borderRadius: '30px' }}
                    >
                        <span className="text-blue-600 text-lg font-medium">Glassmorphism Preview</span>
                    </div>
                </div>

                {/* Glassmorphism Code */}
                <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col" style={{ borderRadius: '30px', height: '350px' }}>
                    <h2 className="text-2xl font-bold mb-4 text-blue-800 px-8 pt-6">Generated Code</h2>
                    <div className="flex flex-col flex-1 px-8 pb-4">
                        <pre className="whitespace-pre-wrap break-words text-blue-800 overflow-auto flex-1 text-left">{glassCode}</pre>
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

            {/* Blue Horizontal Line */}
            <div className="border-t-4 border-[#2563eb] mt-[20px]"></div>
        </>
    );
}
