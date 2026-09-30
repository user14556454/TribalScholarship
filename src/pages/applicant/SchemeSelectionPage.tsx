import React, { useState } from 'react';
import { SCHEMES } from '../../config/schemes';
import { SchemeDefinition } from '../../types/scheme';
import { SchemeCard } from '../../components/applicant/SchemeCard';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Search, Filter, BookOpen, CheckCircle, Award, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SchemeSelectionPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<SchemeDefinition | null>(null);
  const navigate = useNavigate();

  const filteredSchemes = SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(search.toLowerCase()) ||
      scheme.code.toLowerCase().includes(search.toLowerCase()) ||
      scheme.shortDescription.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || scheme.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
          Ministry of Tribal Affairs Schemes · 2026-27
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1">Choose a Scheme to Apply</h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Review central sector fellowship, overseas scholarship, and premier institution fee waiver schemes for Scheduled Tribe scholars.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scheme name or code (e.g. NFST, NOS)..."
            className="h-10 pl-9 pr-3 bg-white text-xs border border-[#CBD5E1] rounded w-full outline-none focus:ring-2 focus:ring-[#0284C7]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { key: 'ALL', label: 'All Schemes' },
            { key: 'FELLOWSHIP', label: 'Doctoral Fellowships' },
            { key: 'OVERSEAS', label: 'Overseas Study (NOS)' },
            { key: 'HIGHER_EDUCATION', label: 'Top Class Premier' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            onOpenGuidelines={(s) => setSelectedSchemeForModal(s)}
          />
        ))}
      </div>

      {/* Guidelines Details Modal */}
      {selectedSchemeForModal && (
        <Modal
          isOpen={!!selectedSchemeForModal}
          onClose={() => setSelectedSchemeForModal(null)}
          title={`${selectedSchemeForModal.title} · Guidelines`}
          maxWidth="xl"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setSelectedSchemeForModal(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const id = selectedSchemeForModal.id;
                  setSelectedSchemeForModal(null);
                  navigate(`/applicant/apply/${id}`);
                }}
              >
                Proceed to Apply
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#F0F9FF] border border-[#BAE6FD] rounded text-[#075985]">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Award className="w-4 h-4 text-[#0284C7]" />
                <span>Financial Assistance Rate & Duration</span>
              </div>
              <p className="leading-relaxed">{selectedSchemeForModal.stipendOrAwardText}</p>
            </div>

            <div>
              <h4 className="font-bold text-[#0F172A] mb-2 text-sm">Eligibility Requirements:</h4>
              <div className="space-y-2">
                {selectedSchemeForModal.eligibilityRules.map((rule) => (
                  <div key={rule.id} className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <p className="font-semibold text-[#0F172A]">{rule.description}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Policy Target Field: <code className="font-mono">{rule.field}</code></p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0F172A] mb-2 text-sm">Mandatory Documents Required:</h4>
              <div className="space-y-1.5">
                {selectedSchemeForModal.documentsRequired.map((doc) => (
                  <div key={doc.type} className="flex items-start gap-2 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                    <FileText className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0F172A]">{doc.title}</p>
                      {doc.guideline && <p className="text-[11px] text-[#64748B]">{doc.guideline}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[#64748B]">
              <span>Governing Policy Version: <strong>{selectedSchemeForModal.policyVersion}</strong></span>
              <span>Available Slots: <strong>{selectedSchemeForModal.quotas.totalSlots}</strong></span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
