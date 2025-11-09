'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronRight,
    ArrowLeft,
    X,
    CheckCircle,
    AlertTriangle,
    FileText,
    Upload,
    Mail,
    AlertCircle,
    Shield,
    FileCheck,
    ChevronDown,
} from 'lucide-react';

/* ==============================================================
   TYPES & CONSTANTS
   ============================================================== */
type FormState = {
    email: string;
    selectedQuery: string;
    subject: string;
    description: string;
    category: string;
    details: string;
    url: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: string;
    isTrustedFlagger: boolean;
    iCertify: boolean;
    iAcknowledge: boolean;
    files: File[];
};

const QUERY_OPTIONS = [
    'Notice of illegal content',
    'Help with an order',
    'Other general question',
] as const;

const CATEGORIES = [
    'Counterfeit products',
    'Illegal downloads or piracy',
    'Hate speech or discrimination',
    'Scams or fraud',
    'Other illegal content',
] as const;

const initialForm: FormState = {
    email: '',
    selectedQuery: QUERY_OPTIONS[0],
    subject: '',
    description: '',
    category: '',
    details: '',
    url: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: '',
    isTrustedFlagger: false,
    iCertify: false,
    iAcknowledge: false,
    files: [],
};

/* ==============================================================
   CUSTOM COMPONENTS
   ============================================================== */
const InputField = ({
    label,
    id,
    type = 'text',
    required = false,
    placeholder = '',
    value,
    onChange,
    error,
    className = '',
}: {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    className?: string;
}) => (
    <div className={`mb-5 ${className}`}>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'textarea' ? (
            <textarea
                id={id}
                rows={4}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200 resize-none ${error ? 'border-red-400' : 'border-gray-300'
                    }`}
            />
        ) : (
            <input
                type={type}
                id={id}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200 ${error ? 'border-red-400' : 'border-gray-300'
                    }`}
            />
        )}
        {error && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
            </p>
        )}
    </div>
);

const DropdownField = ({
    label,
    id,
    required = false,
    options,
    value,
    onChange,
    error,
    className = '',
}: {
    label: string;
    id: string;
    required?: boolean;
    options: readonly string[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    className?: string;
}) => (
    <div className={`mb-5 relative ${className}`}>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <select
                id={id}
                required={required}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 pr-10 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm appearance-none transition-all duration-200 ${error ? 'border-red-400' : 'border-gray-300'
                    }`}
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
        {error && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
            </p>
        )}
    </div>
);

const CheckboxField = ({
    id,
    required = false,
    checked,
    onChange,
    children,
    error,
}: {
    id: string;
    required?: boolean;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    error?: string;
}) => (
    <div className="mb-5">
        <label className="flex items-start text-sm font-medium text-gray-700 cursor-pointer">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                required={required}
                onChange={onChange}
                className="h-4.5 w-4.5 mt-0.5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 transition"
            />
            <span className="ml-3 leading-tight">
                {children} {required && <span className="text-red-500">*</span>}
            </span>
        </label>
        {error && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
            </p>
        )}
    </div>
);

const SubmissionStatus = ({
    message,
    type,
    onClose,
}: {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}) => {
    const isSuccess = type === 'success';
    const Icon = isSuccess ? CheckCircle : AlertTriangle;
    const colors = isSuccess
        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
        : 'bg-red-50 border-red-200 text-red-700';

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div
                className={`max-w-md w-full p-6 rounded-2xl shadow-2xl border ${colors} flex items-start gap-4 animate-in fade-in zoom-in duration-200`}
            >
                <Icon className={`w-6 h-6 flex-shrink-0 ${isSuccess ? 'text-emerald-600' : 'text-red-600'}`} />
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{isSuccess ? 'Report Submitted' : 'Submission Failed'}</h3>
                    <p className="text-sm">{message}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-5 py-2.5 text-sm font-semibold rounded-xl bg-white border border-gray-300 hover:bg-gray-50 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ==============================================================
   MAIN COMPONENT
   ============================================================== */
export default function ReportIllicitContentApp() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    /* ---------- VALIDATION ---------- */
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!form.email) newErrors.email = 'Email is required';
        if (!form.subject) newErrors.subject = 'Subject is required';
        if (!form.description) newErrors.description = 'Description is required';

        if (form.selectedQuery === 'Notice of illegal content') {
            if (!form.category) newErrors.category = 'Category is required';
            if (!form.details) newErrors.details = 'Details are required';
            if (!form.url) newErrors.url = 'URL is required';
            if (!form.firstName) newErrors.firstName = 'First name is required';
            if (!form.lastName) newErrors.lastName = 'Last name is required';
            if (!form.address) newErrors.address = 'Address is required';
            if (!form.city) newErrors.city = 'City is required';
            if (!form.state) newErrors.state = 'State is required';
            if (!form.country) newErrors.country = 'Country is required';
            if (!form.zip) newErrors.zip = 'Postal code is required';
            if (!form.iCertify) newErrors.iCertify = 'You must certify the information';
            if (!form.iAcknowledge) newErrors.iAcknowledge = 'You must acknowledge sharing';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* ---------- INPUT HANDLER ---------- */
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { id, value, type } = e.target;
            const target = e.target as HTMLInputElement;

            setForm((prev) => ({
                ...prev,
                [id]: type === 'checkbox' ? target.checked : value,
            }));

            if (errors[id]) {
                setErrors((prev) => ({ ...prev, [id]: '' }));
            }
        },
        [errors]
    );

    /* ---------- FILE HANDLERS (FULLY TYPED) ---------- */
    const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(
            (f) =>
                f.size <= 5 * 1024 * 1024 &&
                ['.pdf', '.jpg', '.jpeg', '.png'].some((ext) =>
                    f.name.toLowerCase().endsWith(ext)
                )
        );
        if (files.length) {
            setForm((prev) => ({ ...prev, files: [...prev.files, ...files] }));
        }
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).filter(
            (f) =>
                f.size <= 5 * 1024 * 1024 &&
                ['.pdf', '.jpg', '.jpeg', '.png'].some((ext) =>
                    f.name.toLowerCase().endsWith(ext)
                )
        );
        setForm((prev) => ({ ...prev, files: [...prev.files, ...files] }));
    }, []);

    const removeFile = useCallback((index: number) => {
        setForm((prev) => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index),
        }));
    }, []);

    /* ---------- SUBMIT ---------- */
    const handleSubmit = () => {
        if (!validateForm()) return;

        console.log('Submitted:', form);
        setStatus({
            message: 'Your report has been submitted successfully. We’ll review it within 48 hours.',
            type: 'success',
        });
        setTimeout(() => setForm(initialForm), 1500);
    };

    const isIllegalContent = form.selectedQuery === 'Notice of illegal content';

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
                {/* Status Modal */}
                {status && <SubmissionStatus message={status.message} type={status.type} onClose={() => setStatus(null)} />}

                <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    {/* Breadcrumb & Back */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <Link
                            href="/help"
                            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            Back to Help Center
                        </Link>
                        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                            <ol className="flex items-center space-x-2">
                                {['ISMart', 'Help', 'Report Content'].map((crumb, i) => (
                                    <React.Fragment key={crumb}>
                                        {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
                                        <li>
                                            {i === 2 ? (
                                                <span className="font-semibold text-gray-900">{crumb}</span>
                                            ) : (
                                                <Link href="#" className="hover:text-primary-600 transition">
                                                    {crumb}
                                                </Link>
                                            )}
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ol>
                        </nav>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-6 sm:p-8 lg:p-12">
                            <div className="flex items-start gap-3 mb-6">
                                <Shield className="w-7 h-7 text-primary-600 mt-0.5" />
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900">Report Illicit Content</h1>
                                    <p className="mt-1 text-gray-600">
                                        Help us keep ISMart safe. Report counterfeit, illegal, or harmful content.
                                    </p>
                                </div>
                            </div>

                            {/* Core Fields */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <InputField
                                    label="Your Email"
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="you@domain.com"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    error={errors.email}
                                />
                                <DropdownField
                                    label="Type of Report"
                                    id="selectedQuery"
                                    required
                                    options={QUERY_OPTIONS}
                                    value={form.selectedQuery}
                                    onChange={handleInputChange}
                                    error={errors.selectedQuery}
                                />
                            </div>

                            <InputField
                                label="Subject"
                                id="subject"
                                required
                                placeholder="Brief summary of your report"
                                value={form.subject}
                                onChange={handleInputChange}
                                error={errors.subject}
                            />

                            <InputField
                                label="Description"
                                id="description"
                                type="textarea"
                                required
                                placeholder="Provide all relevant details..."
                                value={form.description}
                                onChange={handleInputChange}
                                error={errors.description}
                            />

                            {/* Conditional: Illegal Content Form */}
                            {isIllegalContent && (
                                <div className="mt-10 space-y-8 border-t pt-8">
                                    <div className="flex items-center gap-2">
                                        <FileCheck className="w-5 h-5 text-primary-600" />
                                        <h2 className="text-xl font-bold text-gray-900">Illegal Content Report</h2>
                                    </div>

                                    <DropdownField
                                        label="Category"
                                        id="category"
                                        required
                                        options={CATEGORIES}
                                        value={form.category}
                                        onChange={handleInputChange}
                                        error={errors.category}
                                    />

                                    <InputField
                                        label="Details (max 255 chars)"
                                        id="details"
                                        type="textarea"
                                        required
                                        placeholder="Describe the issue clearly..."
                                        value={form.details}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 255) handleInputChange(e);
                                        }}
                                        error={errors.details}
                                    />
                                    {form.details.length > 220 && (
                                        <p className="text-xs text-gray-500 text-right">{form.details.length}/255</p>
                                    )}

                                    <InputField
                                        label="URL(s) of Content"
                                        id="url"
                                        required
                                        placeholder="https://ismart.com/product/..."
                                        value={form.url}
                                        onChange={handleInputChange}
                                        error={errors.url}
                                    />

                                    {/* Filer Info */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-emerald-600" />
                                            Your Information
                                        </h3>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <InputField label="First Name" id="firstName" required value={form.firstName} onChange={handleInputChange} error={errors.firstName} />
                                            <InputField label="Last Name" id="lastName" required value={form.lastName} onChange={handleInputChange} error={errors.lastName} />
                                            <InputField label="Company (optional)" id="company" value={form.company} onChange={handleInputChange} />
                                            <InputField label="Phone (optional)" id="phone" type="tel" value={form.phone} onChange={handleInputChange} />
                                        </div>
                                        <InputField label="Address" id="address" required value={form.address} onChange={handleInputChange} error={errors.address} />
                                        <div className="grid gap-6 md:grid-cols-3">
                                            <InputField label="City" id="city" required value={form.city} onChange={handleInputChange} error={errors.city} />
                                            <InputField label="State/Region" id="state" required value={form.state} onChange={handleInputChange} error={errors.state} />
                                            <InputField label="Postal Code" id="zip" required value={form.zip} onChange={handleInputChange} error={errors.zip} />
                                        </div>
                                        <InputField label="Country" id="country" required value={form.country} onChange={handleInputChange} error={errors.country} />
                                    </div>

                                    <CheckboxField id="isTrustedFlagger" checked={form.isTrustedFlagger} onChange={handleInputChange}>
                                        I am a <span className="font-semibold">Trusted Flagger</span> (optional)
                                    </CheckboxField>

                                    {/* File Upload */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments (optional)</h3>
                                        <div
                                            onDrop={handleFileDrop}
                                            onDragOver={(e) => e.preventDefault()}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                                        >
                                            <Upload className="w-10 h-10 text-primary-500 mx-auto mb-3" />
                                            <p className="font-semibold text-gray-700">Drop files here or click to upload</p>
                                            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG — Max 5MB each</p>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                multiple
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </div>

                                        {form.files.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {form.files.map((file, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm text-sm"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="w-4 h-4 text-gray-500" />
                                                            <span className="font-medium text-gray-700 truncate max-w-[200px]">{file.name}</span>
                                                            <span className="text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeFile(i);
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Certification */}
                                    <div className="space-y-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
                                        <CheckboxField id="iCertify" required checked={form.iCertify} onChange={handleInputChange} error={errors.iCertify}>
                                            I certify the accuracy of this report and am authorized to act.
                                        </CheckboxField>
                                        <CheckboxField id="iAcknowledge" required checked={form.iAcknowledge} onChange={handleInputChange} error={errors.iAcknowledge}>
                                            I allow ISMart to share this with relevant parties.
                                        </CheckboxField>
                                    </div>
                                </div>
                            )}

                            {/* Submit */}
                            <div className="mt-12 pt-8 border-t flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    className="group inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/30 focus-visible:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit Report
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 text-center text-sm text-gray-800">
                        <p className="flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-600" />
                            Your report is secure and confidential
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}