export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="loading-robot"
      >
        {/* Robot head */}
        <rect
          x="40"
          y="40"
          width="120"
          height="120"
          rx="20"
          fill="#64B5F6"
          className="robot-head"
        />

        {/* Robot eyes */}
        <circle
          cx="70"
          cy="80"
          r="15"
          fill="white"
          className="robot-eye left-eye"
        />
        <circle
          cx="130"
          cy="80"
          r="15"
          fill="white"
          className="robot-eye right-eye"
        />

        {/* Robot mouth */}
        <path
          d="M70 130 Q100 150 130 130"
          stroke="white"
          strokeWidth="5"
          className="robot-mouth"
        />

        {/* Robot antenna */}
        <line
          x1="100"
          y1="40"
          x2="100"
          y2="20"
          stroke="#FFA726"
          strokeWidth="4"
          className="robot-antenna"
        />
        <circle
          cx="100"
          cy="15"
          r="5"
          fill="#FFA726"
          className="robot-antenna-top"
        />
      </svg>
    </div>
  );
}
