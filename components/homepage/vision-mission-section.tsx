interface VisionMissionData {
  id: string;
  vision: string | null;
  mission: string | null;
  goals: string | null;
  updated_at: string | null;
}

interface VisionMissionSectionProps {
  data: VisionMissionData | null;
}

export function VisionMissionSection({ data }: VisionMissionSectionProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Vision */}
          {data.vision && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Vision
                </h2>
              </div>
              <div className="pl-15">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.vision}
                </p>
              </div>
            </div>
          )}

          {/* Mission */}
          {data.mission && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Mission
                </h2>
              </div>
              <div className="pl-15">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.mission}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Goals */}
        {data.goals && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Goals
              </h2>
            </div>
            <div className="pl-15">
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="whitespace-pre-line">{data.goals}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
