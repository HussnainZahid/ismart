'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef, Dispatch, SetStateAction, ReactNode } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

// =====================================================================
// === 1. TYPESCRIPT INTERFACES ========================================
// =====================================================================

/** Defines the structure for data within the Legal Basis tables. */
interface LegalBasisItem {
    purpose: string;
    basis: string;
}

/** Defines the structure for the Data Protection Authorities table. */
interface DataProtectionAuthority {
    country: string;
    authority: string;
    website: string;
}

/** Defines the structure for the Personal Data Glossary. */
interface GlossaryTerm {
    term: string;
    definition: string;
}

/** Defines the complete map of legal basis data, including a string index signature. */
interface LegalBasisDataMap {
    'legal-basis-services': LegalBasisItem[];
    'legal-basis-marketing': LegalBasisItem[];
    'legal-basis-improving': LegalBasisItem[];
    'legal-basis-fraud': LegalBasisItem[];
    'legal-basis-legal': LegalBasisItem[];
    [key: string]: LegalBasisItem[];
}

/** Defines the structure for a single section or subsection in the policy. */
interface PolicySection {
    id: string;
    title: string;
    subsections?: PolicySection[];
}

// =====================================================================
// === 2. MOCK POLICY DATA (Typed) =====================================
// =====================================================================

// REMOVED export keyword here
const POLICY_SECTIONS: PolicySection[] = [
    {
        id: 'controller',
        title: '1. WHO IS THE CONTROLLER OF YOUR PERSONAL DATA?',
    },
    {
        id: 'legal-basis',
        title: '2. WHY DO WE USE YOUR PERSONAL DATA AND ON WHAT LEGAL BASIS?',
        subsections: [
            {
                id: 'legal-basis-services',
                title: '2.1. Use of the services offered on the Platform',
            },
            {
                id: 'legal-basis-marketing',
                title: '2.2 Marketing and sales activities',
            },
            {
                id: 'legal-basis-improving',
                title: '2.3 Improving services',
            },
            {
                id: 'legal-basis-fraud',
                title: '2.4. Prevention, detection, and fight against fraud and security incidents',
            },
            {
                id: 'legal-basis-legal',
                title: '2.5. Managing legal and tax obligations',
            },
        ],
    },
    {
        id: 'data-collect',
        title: '3. WHAT PERSONAL DATA DO WE COLLECT?',
    },
    {
        id: 'data-retention',
        title: '4. HOW LONG DO WE KEEP YOUR PERSONAL DATA?',
    },
    {
        id: 'data-sharing',
        title: '5. WHO DO WE SHARE YOUR PERSONAL DATA WITH?',
    },
    {
        id: 'data-transfer',
        title: '6. WILL YOUR PERSONAL DATA BE TRANSFERRED OUTSIDE THE EU OR THE UK?',
    },
    {
        id: 'your-rights',
        title: '7. WHAT ARE YOUR RIGHTS REGARDING YOUR PERSONAL DATA?',
    },
    {
        id: 'updates',
        title: '8. POLICY UPDATES',
    },
    {
        id: 'glossary',
        title: '9. PERSONAL DATA GLOSSARY',
    },
];

// Reusable data structure for Purpose/Legal Basis Tables
const LEGAL_BASIS_TABLES: LegalBasisDataMap = {
    'legal-basis-services': [
        { purpose: 'Access to and browsing on the Platform', basis: 'Performance of the contract' },
        { purpose: 'Management of orders placed via the Platform', basis: 'Performance of a contract' },
        { purpose: 'Management of trade-in offers made via the Platform', basis: 'Performance of a contract' },
        { purpose: 'After-sales service and customer relations management*', basis: 'Performance of a contract' },
        { purpose: 'Creation of, and connection to, your customer account via Social Login', basis: 'Consent' },
        { purpose: 'Payment by a buyer in one or more installments', basis: 'Performance of a contract' },
        { purpose: 'Payment to an individual for the trade-in of a product', basis: 'Performance of a contract' },
        { purpose: 'Provision of additional services (insurance)', basis: 'Performance of a contract' },
    ],
    'legal-basis-marketing': [
        { purpose: 'Direct marketing and email newsletters', basis: 'Consent or our legitimate interest in similar products or services' },
        { purpose: 'Displaying personalized content on the Platform based on your browsing habits and profile', basis: 'Consent' },
        { purpose: 'Serving personalised online ads based on your preferences and browsing habits', basis: 'Consent' },
        { purpose: 'Personalising, measuring, and improving the distribution and effectiveness of our advertising operations in collaboration with our partners', basis: 'Consent' },
        { purpose: 'Creating audiences on certain social networks for marketing purposes', basis: 'Consent' },
        { purpose: 'Organising games and contests', basis: 'Consent' },
        { purpose: 'Student program and sponsoring', basis: 'Consent' },
        { purpose: 'Segmentation and analysis of our customer database to improve our customer knowledge and adapt our marketing strategies', basis: 'Legitimate interest' },
    ],
    'legal-basis-improving': [
        { purpose: 'Carrying out statistical analyses of the use of our Platform', basis: 'Legitimate interest' },
        { purpose: 'Analyzing your browsing behaviour to improve our services', basis: 'Legitimate interest' },
        { purpose: 'Recording of calls, messages and chats with our customer service or sellers for the purposes of training customer service agents or improving our service', basis: 'Legitimate interest' },
        { purpose: 'Conducting polls and surveys to improve our Platform and services, and collecting and managing feedback and reviews', basis: 'Consent or our legitimate interest' },
    ],
    'legal-basis-fraud': [
        { purpose: 'Preventing and fighting against fraud', basis: 'Consent or our legitimate interest' },
        { purpose: 'Preventing and managing security incidents and any other illegal activity on our Platform', basis: 'Legitimate interest' },
    ],
    'legal-basis-legal': [
        { purpose: 'Pre-litigation and litigation management', basis: 'Legal obligation and/or our legitimate interest' },
        { purpose: 'Fulfilling our accounting reporting obligations', basis: 'Legal obligation' },
        { purpose: 'Management of requests sent to our Data Protection Officer in connection with the exercise of your rights regarding your Personal Data', basis: 'Legal obligation' },
        { purpose: 'Collecting information and reporting to the French tax authorities in relation to the Trade-in Service', basis: 'Legal obligation' },
    ],
};

// Data Protection Authorities
const DP_AUTHORITIES: DataProtectionAuthority[] = [
    { 
        country: 'FRANCE', 
        authority: 'Commission nationale de l\'informatique et des libertés (CNIL)', 
        website: 'https://www.cnil.fr' 
    },
    { 
        country: 'GERMANY', 
        authority: 'Jurisdiction between data protection authorities is allocated by Länder. To find out which authorities are responsible, please see the list provided by the Bundesbeauftragte für den Datenschutz und die Informationsfreiheit.', 
        website: 'https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html' 
    },
    { 
        country: 'AUSTRIA', 
        authority: 'Österreichische Datenschutzbehörde.', 
        website: 'http://www.dsb.gv.at' 
    },
    { 
        country: 'BELGIUM', 
        authority: 'Autorité de la protection des données - Gegevensbeschermingsautoriteit (APD-GBA)', 
        website: 'https://www.autoriteprotectiondonnees.be' 
    },
    { 
        country: 'SPAIN', 
        authority: 'Agencia Española de Protección de Datos (AEPD)', 
        website: 'http://www.aepd.es/agpd/' 
    },
    { 
        country: 'FINLAND', 
        authority: 'Office of the Data Protection Ombudsman', 
        website: 'http://www.tietosuoja.fi/en/' 
    },
    { 
        country: 'GREECE', 
        authority: 'Hellenic Data Protection Authority', 
        website: 'http://www.dpa.gr' 
    },
    { 
        country: 'IRELAND', 
        authority: 'Data Protection Commission', 
        website: 'http://www.dataprotection.ie' 
    },
    { 
        country: 'ITALY', 
        authority: 'Garante per la protezione dei dati personali', 
        website: 'http://www.garanteprivacy.it' 
    },
    { 
        country: 'NETHERLANDS', 
        authority: 'Autoriteit Persoonsgegevens', 
        website: 'http://autoriteitpersoonsgegevens.nl' 
    },
    { 
        country: 'PORTUGAL', 
        authority: 'Comissão Nacional de Proteção de Dados (CNPD)', 
        website: 'http://www.cnpd.pt' 
    },
    { 
        country: 'UNITED KINGDOM', 
        authority: 'Information Commissioner\'s Office (ICO)', 
        website: 'http://ico.org.uk' 
    },
    { 
        country: 'SLOVAKIA', 
        authority: 'Office for Personal Data Protection of the Slovak Republic', 
        website: 'http://www.dataprotection.gov.sk' 
    },
    { 
        country: 'SWEDEN', 
        authority: 'Integritetsskyddsmyndigheten', 
        website: 'http://www.imy.se' 
    },
];
// Glossary Terms
const GLOSSARY_TERMS: GlossaryTerm[] = [
    { term: 'Cookie', definition: 'Means a small computer file, a tracer, that is placed on your device and read, e.g., when you browse a website, open an e-mail, or install or use a software or mobile application, regardless of the type of device used (computer, smartphone, etc.).' },
    { term: 'Data Protection Officer', definition: 'Means the person within Back Market whose role is to ensure that Back Market processes your Personal Data in compliance with applicable data protection regulations.' },
    { term: 'Personal Data', definition: 'Are information that makes it possible to identify you, whether directly or indirectly by reference to an identifier or from the cross-referencing of a set of data. This may include your first and last name, contact details, customer number, image or voice, or IP address.' },
    { term: 'Purpose', definition: 'Is the primary purpose for which Personal Data are used. In other words, this is the "why", the reason why we use your Personal Data.' },
    { term: 'Data Controller', definition: 'Means the natural or legal person who determines the Purposes and means of the Processing of your Personal Data, i.e., all operations carried out with them (such as collecting, consulting, or storing them). In other words, this is the person who decides why and how to process your Personal Data.' },
    { term: 'Processor', definition: 'Means the natural person or legal entity (company or public body) that processes Personal Data on behalf of the Data Controller as part of a service. Our relationships with our Processors are governed by Processing Agreements that fully comply with applicable legal requirements.' },
    { term: 'Processing', definition: 'Means one or more operations carried out on Personal Data, regardless of the process used. This ranges from the mere collection of Personal Data to the use, consultation, transformation, matching, or transfer of Personal Data to a third party.' },
];

// =====================================================================
// === 3. REUSABLE COMPONENTS (Typed) =================================
// =====================================================================

interface PolicyTableProps {
    title: string;
    data: LegalBasisItem[];
}

const PolicyTable: React.FC<PolicyTableProps> = ({ title, data }) => (
    <div className="mt-8 mb-12">
        <h4 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">{title}</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 bg-gray-50 font-bold text-sm text-gray-700 p-4 border-b border-gray-200">
                <span>Purposes</span>
                <span className="text-right sm:text-left">Legal basis</span>
            </div>
            {data.map((row: LegalBasisItem, index: number) => (
                <div key={index} className={`grid grid-cols-2 p-4 text-sm text-gray-600 ${index < data.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <ul className="list-none space-y-2">
                        {row.purpose.split('\n').map((item: string, i: number) => (
                            <li key={i} className="flex items-start">
                                <span className="mr-2 text-gray-500">-</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <span className="text-right sm:text-left font-medium text-gray-700">{row.basis}</span>
                </div>
            ))}
        </div>
    </div>
);

interface GlossaryTableProps {
    data: GlossaryTerm[];
}

const GlossaryTable: React.FC<GlossaryTableProps> = ({ data }) => (
    <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {data.map((row: GlossaryTerm, index: number) => (
            <div key={index} className={`grid grid-cols-1 sm:grid-cols-4 p-4 text-sm text-gray-600 ${index < data.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="font-semibold text-gray-800 col-span-1 border-b sm:border-b-0 pb-2 sm:pb-0">{row.term}</span>
                <span className="col-span-1 sm:col-span-3 pt-2 sm:pt-0">{row.definition}</span>
            </div>
        ))}
    </div>
);

interface TOCProps {
    sections: PolicySection[];
    activeId: string;
    setActiveId: Dispatch<SetStateAction<string>>;
    isMobileOpen: boolean;
    setIsMobileOpen: Dispatch<SetStateAction<boolean>>;
}

const TOC: React.FC<TOCProps> = ({
    sections,
    activeId,
    setActiveId,
    isMobileOpen,
    setIsMobileOpen
}) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveId(id);
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            <button
                className="fixed top-4 right-4 z-50 p-3 bg-gray-900 text-white rounded-full md:hidden shadow-xl"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle navigation"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className={`fixed top-0 left-0 h-full w-full bg-white z-40 p-6 md:p-0 md:relative md:h-auto md:w-full md:block transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="md:sticky md:top-20 md:max-h-[calc(100vh-100px)] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 md:hidden">Contents</h3>
                    <ul className="space-y-2 text-sm">
                        {sections.map((section: PolicySection) => (
                            <React.Fragment key={section.id}>
                                <li>
                                    <a
                                        onClick={() => scrollToSection(section.id)}
                                        className={`block p-2 rounded-lg transition-colors cursor-pointer ${activeId.startsWith(section.id) ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                                {section.subsections && (
                                    <ul className="ml-4 border-l border-indigo-200 space-y-1">
                                        {section.subsections.map((sub: PolicySection) => (
                                            <li key={sub.id}>
                                                <a
                                                    onClick={() => scrollToSection(sub.id)}
                                                    className={`block py-1 px-2 text-xs rounded-lg transition-colors cursor-pointer ${activeId === sub.id ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-800'}`}
                                                >
                                                    {sub.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

// =====================================================================
// === 4. MAIN PAGE COMPONENT (Typed) =================================
// =====================================================================

export default function PolicyPage() {
    const [activeId, setActiveId] = useState<string>(POLICY_SECTIONS[0].id);
    const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                        const targetId = entry.target.id;

                        const mainSection = POLICY_SECTIONS.find(s => s.id === targetId);

                        if (mainSection) {
                            setActiveId(mainSection.id);
                        } else {
                            const parentSection = POLICY_SECTIONS.find(s =>
                                s.subsections && s.subsections.some(sub => sub.id === targetId)
                            );
                            if (parentSection) {
                                setActiveId(targetId);
                            }
                        }
                    }
                });
            },
            { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
        );

        POLICY_SECTIONS.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
            if (section.subsections) {
                section.subsections.forEach(sub => {
                    const subElement = document.getElementById(sub.id);
                    if (subElement) {
                        observer.observe(subElement);
                    }
                });
            }
        });

        return () => observer.disconnect();
    }, []);

    interface SectionProps {
        id: string;
        title: string;
        content: ReactNode;
    }

    const renderSection = ({ id, title, content }: SectionProps) => (
        <section
            id={id}
            key={id}
            ref={(el: HTMLElement | null) => {
                sectionRefs.current[id] = el;
            }}
            className="py-8 border-t border-gray-200"
        >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
            <div className="text-gray-700 leading-relaxed text-base">
                {content}
            </div>
        </section>
    );

    const renderPolicyContent = () => (
        <div className="prose max-w-none">
            {/* Section 1: Controller */}
            {renderSection({
                id: 'controller',
                title: POLICY_SECTIONS[0].title,
                content: (
                    <>
                        <p className="text-lg text-gray-800 leading-relaxed">
                            <strong>ISmart Limited</strong> is the <strong>Data Controller</strong> for all personal data processed through the ISmart Platform.
                        </p>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200 rounded-xl p-6 my-6 shadow-sm">
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="font-semibold text-primary-600 mr-2">Company Name:</span>
                                    ISmart Limited
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-primary-600 mr-2">Legal Form:</span>
                                    Private Limited Company
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-primary-600 mr-2">Registered Office:</span>
                                    71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-primary-600 mr-2">Company Registration:</span>
                                    12345678 (Companies House, UK)
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-primary-600 mr-2">VAT Number:</span>
                                    GB 987 6543 21
                                </li>
                            </ul>
                        </div>

                        <p className="text-lg text-gray-800 leading-relaxed">
                            As the Data Controller, ISmart determines the purposes and lawful means of processing your personal data — always in full compliance with applicable data protection laws.
                        </p>

                        <p className="mt-5 text-lg text-gray-800 leading-relaxed bg-emerald-50 p-5 rounded-lg border-l-4 border-primary-600">
                            <strong>Your privacy is our priority.</strong> We are deeply committed to transparency, security, and continuous improvement in our data practices — fully aligned with the <strong>UK GDPR</strong>, <strong>EU GDPR</strong>, and all relevant data protection regulations across the regions we serve.
                        </p>
                    </>
                )
            })}

            {/* Rest of the sections remain the same... */}
            {/* I'll include section 2 as an example, but you should keep all other sections */}
            
            {/* Section 2: Legal Basis & Purposes */}
            <section id="legal-basis" className="py-10 border-t-2 border-primary-100 bg-gradient-to-b from-white to-emerald-50/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-900 flex items-center">
                        <span className="w-2 h-8 bg-primary-600 rounded-r-full mr-3"></span>
                        {POLICY_SECTIONS[1].title}
                    </h2>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-4xl">
                        We only collect and process your personal data when we have a <strong>lawful basis</strong> to do so. Below, we clearly explain <em>why</em> we use your data and <em>on what legal ground</em> — so you're always in control.
                    </p>

                    {POLICY_SECTIONS[1].subsections!.map((sub, index) => (
                        <div
                            id={sub.id}
                            key={sub.id}
                            className={`mb-12 p-6 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300 ${index % 2 === 1 ? 'bg-emerald-50/50' : ''}`}
                        >
                            <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center">
                                <span className="text-primary-600 font-mono text-sm bg-primary-100 px-3 py-1 rounded-full mr-3">
                                    {index + 1}
                                </span>
                                {sub.title}
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm md:text-base">
                                    <thead>
                                        <tr className="bg-primary-600 text-white">
                                            <th className="text-left p-4 font-semibold rounded-tl-lg">Purpose</th>
                                            <th className="text-left p-4 font-semibold rounded-tr-lg">Legal Basis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LEGAL_BASIS_TABLES[sub.id].map((row, i) => (
                                            <tr
                                                key={i}
                                                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors`}
                                            >
                                                <td className="p-4 text-gray-700">
                                                    <ul className="space-y-1">
                                                        {row.purpose.split('\n').map((item, j) => (
                                                            <li key={j} className="flex items-start">
                                                                <span className="text-primary-600 mr-2">•</span>
                                                                <span>{item.trim()}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="p-4 font-medium text-gray-800 bg-gray-50/80">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                                                        {row.basis}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}

                    <div className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                        <p className="font-medium flex items-start">
                            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span>
                                <strong>Note:</strong> For after-sales support, account issues, or trade-in assistance, we may contact you via email, phone, or SMS (including automated messages) — always in line with our <a href="/terms" className="underline hover:text-amber-900">Terms of Use</a>, <a href="/terms-sale" className="underline hover:text-amber-900">Terms of Sale</a>, and <a href="/trade-in-terms" className="underline hover:text-amber-900">Trade-In Conditions</a>, and only as permitted by law.
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Data We Collect */}
            {renderSection({
                id: 'data-collect',
                title: POLICY_SECTIONS[2].title,
                content: (
                    <>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            We only collect personal data that is **strictly necessary** for you to browse, shop, trade‑in, or contact support.
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                            <p className="text-sm text-emerald-800">
                                <strong>Automatic collection:</strong> Cookies & browsing activity (with your consent).{' '}
                                <Link href="/cookies" className="font-medium text-primary-600 hover:underline">
                                    Manage cookies →
                                </Link>
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 mb-10">
                            <div>
                                <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                                    <span className="flex-shrink-0 w-7 h-7 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        1
                                    </span>
                                    Core Account & Order Data
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    {[
                                        'First name, last name, email, phone, delivery & billing address (payment details stored only by our PCI‑DSS partner)',
                                        'Full order & trade‑in history',
                                        'Reviews, comments & support tickets',
                                        'Promotion / survey / contest participation',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-primary-600 mr-2">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                                    <span className="flex-shrink-0 w-7 h-7 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        2
                                    </span>
                                    Technical & Security Data
                                </h3>
                                <ul className="space-y-3 text-gray-700">
                                    {[
                                        'IP address, device info, pages viewed (for security & analytics)',
                                        'Cookies & session data (consent‑based)',
                                        'Call recordings (only if you agree)',
                                        'Fraud‑detection signals',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-primary-600 mr-2">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        3
                                    </span>
                                    Trade‑In Service
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    Date of birth, nationality, <strong>ID copy</strong> & <strong>IBAN</strong> (required for legal compliance).
                                    Proof‑of‑address may be requested for carbon‑credit claims.
                                </p>
                                <p className="text-xs text-blue-800">
                                    <strong>Deleted after 5 months.</strong>
                                </p>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                                <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        4
                                    </span>
                                    Dispute Resolution
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    ID verification (selfie/video), proof‑of‑address, or additional documents – only to resolve a case.
                                </p>
                                <p className="text-xs text-amber-800">
                                    <strong>Deleted once the case is closed.</strong>
                                </p>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        5
                                    </span>
                                    Social Login
                                </h3>
                                <p className="text-gray-700">
                                    Email & (optionally) full name from Google / Apple / Facebook.
                                </p>
                                <p className="text-xs text-purple-800">
                                    <strong>Not available in every region.</strong>
                                </p>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                                <h3 className="flex items-center text-xl font-bold text-gray-900 mb-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        6
                                    </span>
                                    Third‑Party Verification
                                </h3>
                                <p className="text-gray-700">
                                    Background checks or fraud alerts from GDPR‑compliant partners.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Quick Summary</h4>
                            <p className="text-sm text-gray-600">
                                We never sell your data • All data is encrypted • You control everything in{' '}
                                <Link href="/account/privacy" className="text-primary-600 hover:underline font-medium">
                                    Account Settings
                                </Link>
                                .
                            </p>
                        </div>
                    </>
                ),
            })}

            {/* Section 4: Data Retention */}
            {renderSection({
                id: 'data-retention',
                title: POLICY_SECTIONS[3].title,
                content: (
                    <>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Your data is kept **only as long as necessary** for the purpose it was collected, then securely deleted or anonymised.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
                            <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300">
                                <h4 className="font-bold text-primary-600 mb-3 flex items-center">
                                    <span className="flex-shrink-0 w-7 h-7 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                        P
                                    </span>
                                    Purchases & Trade‑ins
                                </h4>

                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-gray-900">3 years</p>
                                    <p className="text-sm font-medium text-gray-600">
                                        from last contact
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <svg
                                        className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300">
                                <h4 className="font-bold text-primary-600 mb-3 flex items-center">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                        M
                                    </span>
                                    Marketing
                                </h4>

                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-gray-900">3 years</p>
                                    <p className="text-sm font-medium text-gray-600">
                                        from last contact
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <svg
                                        className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8a8.002 8.002 0 01-5.45-2.13.75.75 0 00-1.02 1.1A9.956 9.956 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0a9.956 9.956 0 00-6.47 2.38.75.75 0 001.1 1.02A8.002 8.002 0 0110 2c4.418 0 8 3.582 8 8z" clipRule="evenodd" />
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300">
                                <h4 className="font-bold text-primary-600 mb-3 flex items-center">
                                    <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                        A
                                    </span>
                                    Analytics
                                </h4>

                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-gray-900">
                                        3 years <span className="text-gray-400 mx-1">→</span> 5 years
                                        <span className="block text-sm font-medium text-gray-600"> (pseudonymised)</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Audience stats: <strong className="text-primary-600">26 months</strong>
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <svg className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300">
                                <h4 className="font-bold text-primary-600 mb-3 flex items-center">
                                    <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                        F
                                    </span>
                                    Fraud / Security
                                </h4>

                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-gray-900">
                                        Until resolved
                                    </p>
                                    <p className="text-sm font-medium text-gray-600">
                                        (max <strong className="text-primary-600">3 years</strong>)
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <svg
                                        className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl flex items-start">
                            <svg className="w-6 h-6 text-amber-700 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h4 className="font-bold text-amber-900 mb-1">Legal‑Hold Extension</h4>
                                <p className="text-sm text-amber-800">
                                    After the periods above we may retain data for up to <strong>10 years</strong> solely to meet statutory obligations (tax, accounting, litigation).
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                            <p className="font-semibold text-gray-800 mb-3">Shorter retention for sensitive items:</p>
                            <ul className="space-y-2 text-sm text-gray-700 list-disc ml-6">
                                <li>
                                    <strong>Bank documents / IBAN (Trade‑in)</strong> – <strong className="text-primary-600">5 months</strong>
                                </li>
                                <li>
                                    <strong>Customer‑service call recordings</strong> – <strong className="text-primary-600">6 months</strong>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-10 text-center p-5 bg-primary-50 border border-primary-200 rounded-xl">
                            <p className="text-sm text-primary-800">
                                <strong>All data is encrypted, regularly audited, and deleted automatically when no longer needed.</strong>
                            </p>
                        </div>
                    </>
                ),
            })}

            {/* Section 5: Data Sharing */}
            {renderSection({
                id: 'data-sharing',
                title: POLICY_SECTIONS[4].title,
                content: (
                    <>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            We <strong>never sell your data</strong>. We only share it with trusted partners who help deliver your orders, protect your account, and improve your experience — all under strict GDPR/UK GDPR compliance.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            <div className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-300">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                    <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                        S
                                    </span>
                                    Sellers & Refurbishers
                                </h3>
                                <p className="text-gray-700 text-sm mb-3">
                                    Order & trade-in details shared for fulfillment. Dispute resolution may require ID/docs.
                                </p>
                                <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                                    <strong>They are independent Controllers</strong>
                                </p>
                            </div>

                            <div className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-300">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                        C
                                    </span>
                                    Carriers & Logistics
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Delivery address & order details for shipping.
                                </p>
                            </div>

                            <div className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-300">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                        I
                                    </span>
                                    Brokers & Insurers
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Insurance policy details shared directly with partners.
                                </p>
                            </div>

                            <div className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-300">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                    <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                        P
                                    </span>
                                    Payment Providers
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    PCI‑DSS certified partners handle card data securely.
                                </p>
                            </div>

                            <div className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-300">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                        S
                                    </span>
                                    Service Providers
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Customer support, fraud detection, analytics, and IT — all under strict data processing agreements.
                                </p>
                                <p className="text-xs text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mt-2 inline-block">
                                    <strong>They cannot use your data for other purposes</strong>
                                </p>
                            </div>

                            <div className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-300">
                                <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                    <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                        A
                                    </span>
                                    Authorities
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    Only when required by law or court order.
                                </p>
                            </div>

                        </div>

                        <div className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-emerald-50 border border-primary-200 rounded-xl">
                            <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                                <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                                    Ad
                                </span>
                                Social Networks & Ad Partners
                            </h3>
                            <p className="text-gray-700 mb-3">
                                <strong>With your consent (via advertising cookies)</strong>, we share anonymized data to measure campaign performance and create lookalike audiences on:
                            </p>
                            <div className="flex gap-4 mb-4">
                                <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener" className="text-primary-600 hover:underline font-medium">
                                    Meta (Facebook)
                                </a>
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-primary-600 hover:underline font-medium">
                                    Google
                                </a>
                            </div>
                            <p className="text-sm text-primary-800 bg-primary-100 px-4 py-2 rounded-lg inline-block">
                                <strong>You can withdraw consent anytime</strong> in <Link href="/account/cookies" className="font-bold underline">Cookie Settings</Link>.
                            </p>
                        </div>

                        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
                            <p className="text-sm text-gray-600">
                                Every partner is vetted, bound by <strong>GDPR-compliant contracts</strong>, and audited regularly. Your data is <strong>never sold</strong>.
                            </p>
                        </div>
                    </>
                ),
            })}

            {/* Section 6: International Transfers */}
            {renderSection({
                id: 'data-transfer',
                title: POLICY_SECTIONS[5].title,
                content: (
                    <>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Your data is <strong>primarily processed in Europe</strong> — but in some cases, we transfer it securely to trusted partners outside the EU.
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    🌍
                                </span>
                                When & Why We Transfer Data
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">✓</span>
                                    <strong>Customer support</strong> via global teams
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">✓</span>
                                    <strong>IT services & cloud hosting</strong> (e.g., AWS, Google Cloud)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">✓</span>
                                    <strong>Social media platforms</strong> (Meta, Google) for ad performance
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    🛒
                                </span>
                                Orders from Non-EU Sellers
                            </h3>
                            <p className="text-gray-700">
                                If you buy from a seller outside the EU or use our Trade-In service with a non-EU refurbisher, your order details (name, address, phone) are securely shared with them to fulfill your purchase.
                            </p>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center">
                                <svg className="w-6 h-6 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Your Data Is Protected
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Every international transfer is secured using:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                    <strong>EU Standard Contractual Clauses (SCCs)</strong>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                    <strong>Binding Corporate Rules (BCRs)</strong> where applicable
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                    <strong>Adequacy decisions</strong> (e.g., UK, Japan)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                    <strong>Encryption in transit & at rest</strong>
                                </li>
                            </ul>
                            <p className="text-xs text-emerald-800 mt-4 italic">
                                We only transfer what's necessary — and never without legal safeguards.
                            </p>
                        </div>

                        <div className="mt-10 text-center p-5 bg-primary-50 border border-primary-200 rounded-xl">
                            <p className="text-sm text-primary-800 font-medium">
                                All transfers comply with <strong>UK GDPR</strong> and <strong>EU GDPR</strong>. Your privacy travels safely.
                            </p>
                        </div>
                    </>
                ),
            })}

            {/* Section 7: Your Rights */}
            {renderSection({
                id: 'your-rights',
                title: POLICY_SECTIONS[6].title,
                content: (
                    <>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            You have <strong>full control</strong> over your personal data. Below are your rights under <strong>UK GDPR</strong> and <strong>EU GDPR</strong> — and how to exercise them <strong>in seconds</strong>.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
                            {[
                                { icon: 'Eye', title: 'Access', desc: 'See all your data' },
                                { icon: 'Edit', title: 'Rectify', desc: 'Update or correct info' },
                                { icon: 'Trash', title: 'Erase', desc: 'Delete your account & data' },
                                { icon: 'Ban', title: 'Object', desc: 'Stop marketing or profiling' },
                                { icon: 'Lock', title: 'Restrict', desc: 'Pause processing' },
                                { icon: 'Download', title: 'Portability', desc: 'Export your data' },
                            ].map((right, i) => (
                                <div
                                    key={i}
                                    className="group p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-300"
                                >
                                    <div className="flex items-center mb-3">
                                        <div className="flex-shrink-0 w-9 h-9 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                {right.icon === 'Eye' && (
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                )}
                                                {right.icon === 'Edit' && (
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                )}
                                                {right.icon === 'Trash' && (
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                                                        clipRule="evenodd"
                                                    />
                                                )}
                                                {right.icon === 'Ban' && (
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.367zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                                                        clipRule="evenodd"
                                                    />
                                                )}
                                                {right.icon === 'Lock' && (
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                        clipRule="evenodd"
                                                    />
                                                )}
                                                {right.icon === 'Download' && (
                                                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0L8 8m4 4V4" />
                                                )}
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900">{right.title}</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">{right.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    🔧
                                </span>
                                How to Exercise Your Rights (Instant Actions)
                            </h3>
                            <div className="space-y-5">
                                <div className="flex items-start">
                                    <span className="text-emerald-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong>Delete your account:</strong>{' '}
                                        <Link href="/account/profile" className="text-primary-600 hover:underline font-medium">
                                            My Profile → Delete Account
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-emerald-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong>Stop marketing:</strong> Unsubscribe link or{' '}
                                        <Link href="/account/profile" className="text-primary-600 hover:underline font-medium">
                                            My Profile → Preferences
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-emerald-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong>Manage cookies:</strong>{' '}
                                        <Link href="/cookies" className="text-primary-600 hover:underline font-medium">
                                            Cookie Settings (footer)
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-emerald-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong>Edit profile:</strong>{' '}
                                        <Link href="/account/profile" className="text-primary-600 hover:underline font-medium">
                                            My Profile → Edit
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-emerald-600 mr-3 mt-1">✓</span>
                                    <div>
                                        <strong>Block call recording:</strong> Say "No" when prompted
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    ✉️
                                </span>
                                Contact Our Data Protection Officer
                            </h3>
                            <p className="text-gray-700 mb-3">
                                For any request, email us at:
                            </p>
                            <a
                                href="mailto:dpo@ismart.com"
                                className="inline-block bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700 transition"
                            >
                                dpo@ismart.com
                            </a>
                            <p className="text-sm text-blue-800 mt-3">
                                <strong>Or write to:</strong> ISmart Limited, Data Protection Officer, 71-75 Shelton Street, London WC2H 9JQ, UK
                            </p>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">File a Complaint</h3>
                            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-3 bg-gray-50 font-bold text-sm text-gray-700 p-4 border-b border-gray-200">
                                    <div>Country</div>
                                    <div className="sm:col-span-2">Data Protection Authority</div>
                                </div>
                                {DP_AUTHORITIES.map((auth, i) => (
                                    <div
                                        key={i}
                                        className={`grid grid-cols-1 sm:grid-cols-3 p-4 text-sm text-gray-700 ${i < DP_AUTHORITIES.length - 1 ? 'border-b border-gray-100' : ''}`}
                                    >
                                        <div className="font-semibold text-gray-900">{auth.country}</div>
                                        <div className="sm:col-span-2">
                                            <div>{auth.authority}</div>
                                            <a
                                                href={auth.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-600 hover:underline text-xs break-all"
                                            >
                                                {auth.website}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 text-center p-6 bg-primary-50 border border-primary-200 rounded-xl">
                            <p className="text-sm text-primary-800 font-medium">
                                We respond to all valid requests within <strong>30 days</strong>. Your privacy is our priority.
                            </p>
                        </div>
                    </>
                ),
            })}

            {/* Section 8: Policy Updates */}
            {renderSection({
                id: 'updates',
                title: POLICY_SECTIONS[7].title,
                content: (
                    <>
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">We Keep This Policy Up to Date</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        This Privacy Policy may be updated to reflect changes in our data practices or new legal requirements.
                                    </p>
                                    <p className="text-gray-700 mt-3">
                                        <strong className="text-emerald-800">For major changes:</strong> We'll notify you via <strong>email</strong> or a <strong>prominent banner</strong> on the ISmart Platform.
                                    </p>
                                    <p className="text-sm text-emerald-700 mt-4 italic">
                                        You can always find the latest version right here.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                <strong className="text-gray-700">Current Version:</strong> 2.1
                                <br />
                                <strong className="text-gray-700">Last Updated:</strong> October 30, 2025
                            </p>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-primary-800 font-medium">
                                Your trust matters. We only update when it improves your privacy.
                            </p>
                        </div>
                    </>
                ),
            })}

            {/* Section 9: Glossary */}
            {renderSection({
                id: 'glossary',
                title: POLICY_SECTIONS[8].title,
                content: (
                    <>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Not sure what a term means? We've got you covered. Here's a <strong>clear, plain-English guide</strong> to every key term in this policy.
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {GLOSSARY_TERMS.map((term, index) => (
                                <div
                                    key={index}
                                    className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-300"
                                >
                                    <h4 className="font-bold text-primary-600 mb-3 flex items-center">
                                        <span className="flex-shrink-0 w-7 h-7 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                                            {term.term.charAt(0).toUpperCase()}
                                        </span>
                                        {term.term}
                                    </h4>

                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {term.definition}
                                    </p>

                                    <div className="mt-4 flex justify-end">
                                        <svg
                                            className="w-5 h-5 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a1 1 0 00-1 1v1a1 1 0 102 0V6a1 1 0 00-1-1zm0 5a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                            <p className="text-sm text-emerald-800 font-medium">
                                <strong>Transparency is trust.</strong> We speak plainly so you're always in control.
                            </p>
                        </div>
                    </>
                ),
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center py-4" aria-label="Breadcrumb">
                        <a
                            href="/"
                            className="group flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors duration-200"
                        >
                            <svg
                                className="w-4 h-4 mr-1.5 text-gray-400 group-hover:text-primary-600 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </a>

                        <span className="mx-3 text-gray-400" aria-hidden="true">
                            <ChevronRight className="w-4 h-4" />
                        </span>

                        <span className="flex items-center text-sm font-semibold text-primary-600">
                            <svg
                                className="w-4 h-4 mr-1.5 text-primary-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Privacy Policy
                        </span>
                    </nav>
                </div>
            </header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">

                <div className="text-center md:text-left mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Privacy policy</h1>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">

                    </div>

                </div>

                <div className="text-gray-700 max-w-4xl mx-auto md:mx-0 mb-12 border-b pb-8">
                    <p className="mb-4 leading-relaxed">
                        <strong className="text-primary-600">ISmart Limited</strong> (<strong>"ISmart"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>) operates a trusted online marketplace dedicated to connecting certified refurbishers and professional sellers with environmentally conscious consumers who wish to purchase or trade in high-quality refurbished smartphones and mobile devices (collectively, the <strong>"Platform"</strong>).
                    </p>

                    <p className="mb-4 leading-relaxed">
                        This <strong>Privacy Policy</strong> (the <strong>"Policy"</strong>) was last updated on <strong className="text-primary-600">October 30, 2025</strong> and applies to all users of the ISmart Platform across the <strong>European Economic Area (EEA)</strong>, the <strong>United Kingdom</strong>, and other regions where ISmart operates.
                    </p>

                    <p className="mb-4 leading-relaxed">
                        Our Platform is currently available in:
                        <span className="font-medium text-primary-600">
                            {' '}United Kingdom, France, Germany, Spain, Italy, Netherlands, Belgium, Austria, Ireland, Portugal, Sweden, Finland, Greece, and Slovakia
                        </span>
                        {' '}— accessible via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">ismart.com</code> and localized subdomains.
                    </p>

                    <p className="mb-4 leading-relaxed">
                        This Policy is designed to <strong>clearly and transparently</strong> inform you about:
                    </p>

                    <ul className="list-disc ml-6 space-y-2 font-medium text-gray-800 mb-6">
                        <li>How we collect, use, store, and protect your personal data when you browse, create an account, shop, sell, or trade in devices on ISmart;</li>
                        <li>The legal grounds we rely on for processing your data;</li>
                        <li>Your privacy rights and how to exercise them with ease.</li>
                    </ul>

                    <p className="mt-6 leading-relaxed">
                        This Policy works alongside our <strong>Cookie Policy</strong>, which you can review at any time via the footer of our website or within your account settings on the ISmart app and web platform.
                    </p>

                    <div className="mt-8 flex items-center justify-start">
                        <svg className="w-6 h-6 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium text-emerald-800">
                            Your data is secure, private, and under your control.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">

                    <div className="md:w-1/4 lg:w-1/5 flex-shrink-0">
                        <TOC
                            sections={POLICY_SECTIONS}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            isMobileOpen={isMobileOpen}
                            setIsMobileOpen={setIsMobileOpen}
                        />
                    </div>

                    <div className="md:w-3/4 lg:w-4/5">
                        {renderPolicyContent()}
                    </div>
                </div>
            </div>

        </div>
    );
}