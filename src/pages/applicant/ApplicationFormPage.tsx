import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SCHEMES } from '../../config/schemes';
import { useAuth } from '../../context/AuthContext';
import { applicationService } from '../../services';
import { DocumentItem } from '../../types/document';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { DocumentUploadBox } from '../../components/applicant/DocumentUploadBox';
import { Badge } from '../../components/common/Badge';
import { AIBadge } from '../../components/common/AIBadge';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  FileCheck2,
  AlertCircle,
  FileText
} from 'lucide-react';

const STEPS = [
  { step: 1, title: 'Personal & Category', desc: 'ST & PVTG details' },
  { step: 2, title: 'Academic & Admission', desc: 'Degree & University' },
  { step: 3, title: 'Document Upload & AI', desc: 'Uploads & OCR check' },
  { step: 4, title: 'Review & Declaration', desc: 'Final submission' },
];

export const ApplicationFormPage: React.FC = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const scheme = SCHEMES.find((s) => s.id === schemeId) || SCHEMES[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Rajesh Kumar Soren',
    dob: '1998-05-14',
    gender: 'MALE',
    category: 'ST',
    tribalCommunity: 'Santhal',
    isPvtg: true,
    pvtgName: 'Birhor / Santhal Sub-Group',
    isPwd: false,
    annualFamilyIncome: 185000,
    mobile: user?.mobile || '+91 98351 44820',
    email: user?.email || 'rajesh.soren@cuj.ac.in',
    state: 'Jharkhand',
    district: 'Ranchi',
    address: 'Village Pandra, Post Hehal, Ranchi - 834005',
    // Academic
    pgDegree: 'Master of Arts (Anthropology)',
    pgInstitute: 'Ranchi University',
    pgPercentage: 68.5,
    pgYear: 2023,
    // Admission
    admissionInstitute: 'Central University of Jharkhand',
    courseName: 'Ph.D. in Anthropology & Tribal Studies',
    courseType: 'FULL_TIME',
    admissionYear: 2025,
    registrationNo: 'CUJ/DOC/ANTH/2025/08',
    guideName: 'Prof. Nirmal Minz',
    // Declaration checkbox
    declarationAccepted: false
  });

  // Uploaded Documents State
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, DocumentItem>>({
    caste_certificate: {
      id: 'doc-init-1',
      documentType: 'caste_certificate',
      title: 'ST Community Certificate',
      fileName: 'ST_Certificate_Soren_Rajesh.pdf',
      fileSizeBytes: 1420000,
      uploadedAt: 'Today',
      version: 1,
      verificationStatus: 'VERIFIED',
      aiConfidence: 0.99,
      certificateNumber: 'JH/REV/ST/2022/88219',
      issuedDate: '15 June 2022',
      issuingAuthority: 'Sub-Divisional Magistrate, Ranchi Sadar',
      aiFindings: [
        {
          id: 'f-1',
          field: 'caste_name',
          label: 'Tribal Community Name',
          extractedValue: 'Santhal (Jharkhand ST Entry #24)',
          confidence: 0.99,
          status: 'MATCH',
          detail: 'Matched with approved Central Gazette schedule.'
        }
      ]
    }
  });

  const handleDocumentUploaded = (doc: DocumentItem) => {
    setUploadedDocs((prev) => ({
      ...prev,
      [doc.documentType]: doc
    }));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declarationAccepted) {
      alert('Please check and accept the mandatory applicant declaration before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      const app = await applicationService.createApplication({
        schemeId: scheme.id,
        applicantProfile: {
          id: user?.id || 'user-app-001',
          fullName: formData.fullName,
          dateOfBirth: formData.dob,
          gender: formData.gender as any,
          category: 'ST',
          tribalCommunity: formData.tribalCommunity,
          isPvtg: formData.isPvtg,
          pvtgName: formData.pvtgName,
          isPwd: formData.isPwd,
          annualFamilyIncome: Number(formData.annualFamilyIncome),
          mobileNumber: formData.mobile,
          email: formData.email,
          permanentState: formData.state,
          permanentDistrict: formData.district,
          permanentAddress: formData.address,
          academicHistory: [
            {
              degreeName: formData.pgDegree,
              fieldOfStudy: 'Anthropology',
              institutionName: formData.pgInstitute,
              completionYear: Number(formData.pgYear),
              percentageMarks: Number(formData.pgPercentage)
            }
          ],
          currentAdmission: {
            institutionName: formData.admissionInstitute,
            courseName: formData.courseName,
            courseType: 'FULL_TIME',
            admissionYear: Number(formData.admissionYear),
            registrationNumber: formData.registrationNo,
            guideName: formData.guideName
          },
          bankDetails: {
            accountHolderName: formData.fullName,
            bankName: 'State Bank of India',
            accountNumberMasked: '••••••••4819',
            ifscCode: 'SBIN0011563',
            isAadhaarSeeded: true
          }
        },
        documents: Object.values(uploadedDocs)
      });

      alert(`Application successfully submitted! Generated Application ID: ${app.id}`);
      navigate(`/applicant/tracking/${app.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Wizard Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
              {scheme.code} · Application Wizard
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-1">{scheme.title}</h1>
          </div>
          <span className="text-xs text-[#64748B] bg-[#F8FAFC] px-3 py-1.5 rounded border border-[#E2E8F0]">
            Deadline: <strong className="text-[#0F172A]">{scheme.applicationDeadline}</strong>
          </span>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {STEPS.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;

            return (
              <div
                key={s.step}
                className={`p-3 rounded border flex items-center gap-3 transition-colors ${
                  isCurrent
                    ? 'bg-sky-50/60 border-[#0284C7] ring-1 ring-[#0284C7]'
                    : isCompleted
                    ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-[#0E766E] text-white'
                      : isCurrent
                      ? 'bg-[#0A2540] text-white'
                      : 'bg-[#CBD5E1] text-[#475569]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.step}
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold leading-tight ${
                      isCurrent ? 'text-[#0284C7] font-bold' : isCompleted ? 'text-[#065F46]' : 'text-[#64748B]'
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-[10px] text-[#94A3B8]">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Personal & Demographic Details */}
      {currentStep === 1 && (
        <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Step 1: Personal & Scheduled Tribe Category Information</h3>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name (as per ST Certificate & Aadhaar)"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />
            <Select
              label="Gender"
              value={formData.gender}
              options={[
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female (Eligible for priority earmark)' },
                { value: 'OTHER', label: 'Other' }
              ]}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              required
            />
            <Input
              label="Tribal Community Name (as in Central Gazette)"
              value={formData.tribalCommunity}
              onChange={(e) => setFormData({ ...formData, tribalCommunity: e.target.value })}
              helperText="e.g. Santhal, Munda, Gond, Oraon, Birhor"
              required
            />
            <Select
              label="Belongs to Particularly Vulnerable Tribal Group (PVTG)?"
              value={formData.isPvtg ? 'YES' : 'NO'}
              options={[
                { value: 'YES', label: 'Yes (Qualifies for 50 PVTG Reserved Slots under NFST)' },
                { value: 'NO', label: 'No (General ST Stream)' }
              ]}
              onChange={(e) => setFormData({ ...formData, isPvtg: e.target.value === 'YES' })}
              required
            />
            <Input
              label="PVTG Sub-Group / Clan (if applicable)"
              value={formData.pvtgName}
              onChange={(e) => setFormData({ ...formData, pvtgName: e.target.value })}
            />
            <Input
              label="Total Annual Family Income (in INR)"
              type="number"
              value={formData.annualFamilyIncome}
              onChange={(e) => setFormData({ ...formData, annualFamilyIncome: Number(e.target.value) })}
              helperText="Must match valid revenue-issued Income Certificate"
              required
            />
            <Input
              label="Permanent State of Domicile"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Permanent Residential Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
            <Button
              variant="primary"
              onClick={() => setCurrentStep(2)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Academic Details
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Academic Background & Admission */}
      {currentStep === 2 && (
        <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Step 2: Academic Background & University Enrolment</h3>}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Post-Graduate Degree Name"
              value={formData.pgDegree}
              onChange={(e) => setFormData({ ...formData, pgDegree: e.target.value })}
              required
            />
            <Input
              label="Master’s Institution / University"
              value={formData.pgInstitute}
              onChange={(e) => setFormData({ ...formData, pgInstitute: e.target.value })}
              required
            />
            <Input
              label="Master’s Aggregate Percentage (%)"
              type="number"
              step="0.01"
              value={formData.pgPercentage}
              onChange={(e) => setFormData({ ...formData, pgPercentage: Number(e.target.value) })}
              helperText="Minimum 55.00% required under NFST guidelines"
              required
            />
            <Input
              label="Year of Passing Master’s Degree"
              type="number"
              value={formData.pgYear}
              onChange={(e) => setFormData({ ...formData, pgYear: Number(e.target.value) })}
              required
            />
            <div className="md:col-span-2 pt-2 border-t border-[#F1F5F9]">
              <h4 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-3">
                Current Ph.D. / M.Phil. Admission Particulars
              </h4>
            </div>
            <Input
              label="Admitted University / Research Institution"
              value={formData.admissionInstitute}
              onChange={(e) => setFormData({ ...formData, admissionInstitute: e.target.value })}
              required
            />
            <Input
              label="Enrolled Degree & Field of Research"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              required
            />
            <Input
              label="University Registration / Roll Number"
              value={formData.registrationNo}
              onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
              required
            />
            <Input
              label="Research Supervisor / Guide Name"
              value={formData.guideName}
              onChange={(e) => setFormData({ ...formData, guideName: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-between gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
            <Button variant="secondary" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button variant="primary" onClick={() => setCurrentStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continue to Document Upload
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Document Upload & AI Verification */}
      {currentStep === 3 && (
        <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Step 3: Document Upload & AI-Assisted Verification</h3>}>
          <div className="p-3 bg-[#F0F9FF] border border-[#BAE6FD] rounded text-xs text-[#075985] mb-5 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
            <p>
              Upload your documents below or fetch directly from <strong>DigiLocker</strong>. Our automated system will immediately scan your certificates to verify text legibility, dates, and Gazette caste names.
            </p>
          </div>

          <div className="space-y-4">
            {scheme.documentsRequired.map((docReq) => (
              <DocumentUploadBox
                key={docReq.type}
                documentRequirement={docReq}
                existingDoc={uploadedDocs[docReq.type]}
                onUploadComplete={handleDocumentUploaded}
              />
            ))}
          </div>

          <div className="flex justify-between gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
            <Button variant="secondary" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button variant="primary" onClick={() => setCurrentStep(4)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Review Application & Submit
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Review & Final Submission */}
      {currentStep === 4 && (
        <form onSubmit={handleFinalSubmit}>
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Step 4: Final Application Review & Submission</h3>}>
            <div className="space-y-6">
              {/* Summary Dossier */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-4 text-xs space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[#64748B]">Applicant Name</span>
                    <p className="font-bold text-[#0F172A]">{formData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Category</span>
                    <p className="font-bold text-[#0F172A]">
                      ST ({formData.tribalCommunity}) {formData.isPvtg && <span className="text-[#0E766E]">· PVTG</span>}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Master’s Marks</span>
                    <p className="font-bold text-[#0F172A]">{formData.pgPercentage}%</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Annual Income</span>
                    <p className="font-bold text-[#0F172A]">₹{formData.annualFamilyIncome.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B]">Enrolled Research Degree:</span>
                  <p className="font-bold text-[#0F172A]">
                    {formData.courseName} at {formData.admissionInstitute}
                  </p>
                </div>
              </div>

              {/* Uploaded Documents Verification Summary */}
              <div>
                <h4 className="text-xs font-bold text-[#0F172A] uppercase mb-2">Verified Documents Dossier</h4>
                <div className="space-y-2">
                  {Object.values(uploadedDocs).map((doc) => (
                    <div key={doc.id} className="p-3 bg-white border border-[#E2E8F0] rounded flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0284C7]" />
                        <span className="font-semibold text-[#0F172A]">{doc.title}</span>
                        <span className="text-[#64748B] font-mono text-[11px]">({doc.fileName})</span>
                      </div>
                      <Badge status={doc.verificationStatus} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mandatory Declaration Checkbox */}
              <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded text-xs space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declarationAccepted}
                    onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0284C7] mt-0.5 cursor-pointer"
                  />
                  <span className="text-[#78350F] leading-relaxed">
                    <strong>Mandatory Scholar Declaration:</strong> I hereby solemnly certify that all particulars stated above are true and complete. I belong to the notified Scheduled Tribe community and have uploaded genuine, non-tampered certificates. I am aware that any false declaration will lead to immediate cancellation of fellowship and recovery of funds under applicable laws.
                  </span>
                </label>
              </div>

              <div className="flex justify-between gap-3 pt-4 border-t border-[#E2E8F0]">
                <Button variant="secondary" type="button" onClick={() => setCurrentStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Documents
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={submitting}
                  rightIcon={<ShieldCheck className="w-4 h-4" />}
                >
                  Submit Application (Receipt Will Be Generated)
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}
    </div>
  );
};
