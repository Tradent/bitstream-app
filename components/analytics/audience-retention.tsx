"use client"

export function AudienceRetention() {
  // Mock data for audience retention
  const retentionData = [
    { position: 0, retention: 100 },
    { position: 10, retention: 92 },
    { position: 20, retention: 85 },
    { position: 30, retention: 78 },
    { position: 40, retention: 72 },
    { position: 50, retention: 65 },
    { position: 60, retention: 58 },
    { position: 70, retention: 52 },
    { position: 80, retention: 45 },
    { position: 90, retention: 40 },
    { position: 100, retention: 35 },
  ]

  return (
    <div className="h-80">
      {/* This would be a real chart in production */}
      <div className="h-full w-full bg-sky-50 rounded-lg p-4 flex flex-col">
        <div className="flex-1 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-sky-700">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>

          {/* Chart area */}
          <div className="absolute left-12 right-0 top-0 bottom-0">
            {/* Grid lines */}
            <div className="absolute left-0 right-0 top-0 bottom-0 grid grid-rows-4 gap-0">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-t border-sky-200"></div>
              ))}
            </div>

            {/* Retention line */}
            <svg className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="retention-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(14, 165, 233)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(14, 165, 233)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Line */}
              <path
                d={`
                  M ${retentionData[0].position} ${100 - retentionData[0].retention}
                  ${retentionData
                    .slice(1)
                    .map((point) => `L ${point.position} ${100 - point.retention}`)
                    .join(" ")}
                `}
                fill="none"
                stroke="rgb(14, 165, 233)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="transform scale-x-[1] scale-y-[1]"
              />

              {/* Area under the line */}
              <path
                d={`
                  M ${retentionData[0].position} ${100 - retentionData[0].retention}
                  ${retentionData
                    .slice(1)
                    .map((point) => `L ${point.position} ${100 - point.retention}`)
                    .join(" ")}
                  L ${retentionData[retentionData.length - 1].position} 100
                  L ${retentionData[0].position} 100
                  Z
                `}
                fill="url(#retention-gradient)"
                className="transform scale-x-[1] scale-y-[1]"
              />

              {/* Data points */}
              {retentionData.map((point, i) => (
                <circle
                  key={i}
                  cx={point.position}
                  cy={100 - point.retention}
                  r="3"
                  fill="white"
                  stroke="rgb(14, 165, 233)"
                  strokeWidth="2"
                  className="transform scale-x-[1] scale-y-[1]"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="h-6 flex justify-between text-xs text-sky-700 pl-12">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <div className="text-xs text-sky-700 text-center mt-1">Video Position</div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-sky-700">Average View Duration</div>
          <div className="text-lg font-medium text-sky-900">4:32</div>
        </div>
        <div>
          <div className="text-sm text-sky-700">Audience Retention</div>
          <div className="text-lg font-medium text-sky-900">62%</div>
        </div>
        <div>
          <div className="text-sm text-sky-700">Re-watch Rate</div>
          <div className="text-lg font-medium text-sky-900">18%</div>
        </div>
      </div>
    </div>
  )
}
