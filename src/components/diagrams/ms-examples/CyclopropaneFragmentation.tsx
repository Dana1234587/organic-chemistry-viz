'use client';

import React from 'react';
import MSSpectrumExample from './MSSpectrumExample';

interface CyclopropaneFragmentationProps {
    className?: string;
}

export default function CyclopropaneFragmentation({ className = '' }: CyclopropaneFragmentationProps) {
    const spectrumData = [
        { mz: 39, abundance: 35, label: '39', fragment: 'C₃H₃⁺ (uncertain structure)' },
        { mz: 41, abundance: 75, label: '41', fragment: 'C₃H₅⁺ (allyl cation - loss of H)' },
        { mz: 42, abundance: 100, label: '42 (M⁺)', fragment: 'C₃H₆⁺• (molecular ion BASE PEAK!)', isBasePeak: true, isMolecularIon: true }
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Title */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg p-4">
                <h3 className="text-2xl font-bold text-center">Cyclopropane (C₃H₆) Fragmentation Analysis</h3>
                <p className="text-center text-sm mt-1 opacity-90">Cyclic Alkane • MW = 42 • Ring Stability</p>
            </div>

            {/* Mass Spectrum */}
            <MSSpectrumExample
                title="Mass Spectrum of Cyclopropane"
                data={spectrumData}
                molecularWeight={42}
            />

            {/* Comparison with Propane */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-900 mb-3">⚖️ Comparison: Cyclopropane vs Propane</h5>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-yellow-400">
                            <th className="text-left p-2 text-yellow-900">Feature</th>
                            <th className="text-center p-2 text-yellow-900">Cyclopropane (C₃H₆)</th>
                            <th className="text-center p-2 text-yellow-900">Propane (C₃H₈)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-yellow-200">
                            <td className="p-2 text-gray-700">MW</td>
                            <td className="text-center p-2 font-semibold text-cyan-700">42</td>
                            <td className="text-center p-2 font-semibold text-blue-700">44</td>
                        </tr>
                        <tr className="border-b border-yellow-200 bg-green-50">
                            <td className="p-2 text-gray-700 font-semibold">Base Peak</td>
                            <td className="text-center p-2 font-bold text-green-700">M⁺ = 42</td>
                            <td className="text-center p-2 text-blue-700">m/z = 29 (C₂H₅⁺)</td>
                        </tr>
                        <tr className="border-b border-yellow-200">
                            <td className="p-2 text-gray-700">m/z = 41</td>
                            <td className="text-center p-2 text-cyan-700">75% (C₃H₅⁺, allyl)</td>
                            <td className="text-center p-2 text-gray-400">Absent</td>
                        </tr>
                        <tr>
                            <td className="p-2 text-gray-700">m/z = 29</td>
                            <td className="text-center p-2 text-gray-400">ABSENT</td>
                            <td className="text-center p-2 font-bold text-blue-700">100% (BASE)</td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-xs text-yellow-800 mt-3 italic">
                    🔑 Key distinction: Absence of m/z=29 in cyclopropane distinguishes it from propane!
                </p>
            </div>

            {/* Fragmentation Pathway Diagram */}
            <div className="border-2 border-cyan-300 rounded-lg p-6 bg-gradient-to-br from-cyan-50 to-blue-50">
                <h4 className="text-lg font-bold text-center mb-6 text-cyan-900">
                    Fragmentation Pathways
                </h4>

                <svg viewBox="0 0 900 450" className="w-full h-auto">
                    {/* Molecular Ion - BASE PEAK */}
                    <g>
                        <rect x="330" y="25" width="240" height="130" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" rx="8" />
                        <text x="450" y="48" textAnchor="middle" className="text-sm font-bold fill-green-800">
                            Molecular Ion (M⁺•)
                        </text>
                        <text x="450" y="68" textAnchor="middle" className="text-xs fill-green-700 font-bold">
                            m/z = 42 (BASE PEAK!)
                        </text>

                        {/* Cyclopropane ring - repositioned */}
                        <g transform="translate(450, 108)">
                            <polygon points="0,-22 19,11 -19,11" fill="none" stroke="#000" strokeWidth="3" />
                            <text x="-30" y="28" className="text-sm fill-gray-800">H₂C</text>
                            <text x="15" y="28" className="text-sm fill-gray-800">CH₂</text>
                            <text x="0" y="-30" textAnchor="middle" className="text-sm fill-gray-800">CH₂</text>
                        </g>

                        <circle cx="480" cy="135" r="3" fill="#dc2626" />
                        <text x="487" y="140" className="text-xs fill-red-600 font-bold">•⁺</text>
                    </g>

                    {/* Pathway 1: H loss */}
                    <g>
                        <path d="M 380 160 L 250 260" stroke="#0891b2" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowcyan1)" />
                        <text x="290" y="200" className="text-sm fill-cyan-700 font-semibold">Loss of H•</text>
                        <text x="285" y="218" className="text-xs fill-gray-600">(before or after</text>
                        <text x="288" y="233" className="text-xs fill-gray-600">ring opening)</text>

                        {/* Allyl cation */}
                        <rect x="100" y="270" width="180" height="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" rx="8" />
                        <text x="190" y="295" textAnchor="middle" className="text-sm font-bold fill-blue-800">
                            Allyl Cation
                        </text>
                        <text x="190" y="312" textAnchor="middle" className="text-xs fill-blue-700">
                            m/z = 41 (75%)
                        </text>
                        <text x="190" y="338" textAnchor="middle" className="text-base fill-gray-800">
                            CH₂=CH—CH₂⁺
                        </text>
                        <text x="190" y="360" textAnchor="middle" className="text-xs fill-blue-600 italic">
                            Resonance stabilized
                        </text>
                    </g>

                    {/* Pathway 2: Further loss */}
                    <g>
                        <path d="M 520 160 L 650 260" stroke="#0891b2" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowcyan2)" />
                        <text x="570" y="200" className="text-sm fill-cyan-700 font-semibold">Loss of H₃</text>
                        <text x="575" y="218" className="text-xs fill-gray-600">(uncertain)</text>

                        {/* C3H3+ */}
                        <rect x="620" y="270" width="160" height="100" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
                        <text x="700" y="295" textAnchor="middle" className="text-sm font-bold fill-amber-800">
                            C₃H₃⁺
                        </text>
                        <text x="700" y="312" textAnchor="middle" className="text-xs fill-amber-700">
                            m/z = 39 (35%)
                        </text>
                        <text x="700" y="335" textAnchor="middle" className="text-xs fill-gray-700">
                            Structure uncertain
                        </text>
                        <text x="700" y="352" textAnchor="middle" className="text-xs fill-gray-600 italic">
                            (Possibly propynyl or</text>
                        <text x="700" y="366" textAnchor="middle" className="text-xs fill-gray-600 italic">
                            cyclopropenyl cation)
                        </text>
                    </g>

                    {/* Key insight box */}
                    <g>
                        <rect x="250" y="395" width="400" height="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="8" />
                        <text x="450" y="418" textAnchor="middle" className="text-sm font-bold fill-purple-900">
                            💍 Why is M⁺ (m/z=42) the BASE PEAK?
                        </text>
                        <text x="450" y="435" textAnchor="middle" className="text-xs fill-gray-700">
                            Ring structure provides stability → molecular ion doesn't fragment as easily as acyclic propane!
                        </text>
                    </g>

                    {/* Arrow markers */}
                    <defs>
                        <marker id="arrowcyan1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#0891b2" />
                        </marker>
                        <marker id="arrowcyan2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" fill="#0891b2" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* Detailed Explanation */}
            <div className="bg-white border-2 border-cyan-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-cyan-900 mb-4">📚 Detailed Explanation</h4>

                <div className="space-y-4">
                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Why M⁺ is the Base Peak</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            Unlike propane, cyclopropane's <strong>molecular ion is stable enough to be the base peak</strong>.<br />
                            The ring structure prevents simple C-C cleavages that would produce separate fragments.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Allyl Cation Formation (m/z = 41)</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            Loss of H• (either before or after ring opening) produces <strong>allyl cation C₃H₅⁺</strong>:<br />
                            • Resonance stabilized: CH₂-CH=CH₂⁺ ↔ ⁺CH₂-CH=CH₂<br />
                            • Second most abundant peak (75% relative abundance)
                        </p>
                    </div>

                    <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Distinguishing Feature</h5>
                        <p className="text-sm text-gray-700 ml-4">
                            Cyclopropane shows <strong>NO peak at m/z = 29</strong>, unlike propane where m/z=29 is the base peak.<br />
                            This absence is because the ring cannot simply cleave into CH₃• + C₂H₅⁺.
                        </p>
                    </div>

                    <div className="bg-cyan-50 p-3 rounded border border-cyan-200 mt-4">
                        <p className="text-sm font-semibold text-cyan-900 mb-1">🔑 Key Takeaways:</p>
                        <ul className="text-xs text-gray-700 space-y-1 ml-4">
                            <li>• Ring structure stabilizes molecular ion → M⁺ is base peak</li>
                            <li>• m/z = 41 (allyl cation) is characteristic</li>
                            <li>• ABSENCE of m/z = 29 distinguishes from propane</li>
                            <li>• Demonstrates how structure affects fragmentation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
