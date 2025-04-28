import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Zap,
  AlertTriangle,
  TrendingUp,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Component-scoped styles
const styles = {
  fadeIn: {
    opacity: 0,
    transform: "translateY(10px)",
    animation: "fadeIn 0.5s ease-out forwards",
  },
  transitionAll: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// Custom theme colors
const theme = {
  dark: "#3D0C11", // Dark burgundy
  primary: "#D80032", // Vivid red
  secondary: "#F78CA2", // Soft pink
  light: "#F9DEC9", // Cream/beige
};

// Keyframes for animation to be injected into the document head
const injectStyles = () => {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleEl);

  return () => {
    document.head.removeChild(styleEl);
  };
};

// Competitor data
const competitors = [
  {
    name: "TechCorp Inc.",
    marketShare: 28.5,
    growth: 5.2,
    products: 42,
    sentiment: "Positive",
    score: 85,
  },
  {
    name: "GlobalSolutions LLC",
    marketShare: 23.1,
    growth: 1.9,
    products: 37,
    sentiment: "Neutral",
    score: 72,
  },
  {
    name: "InnovateTech",
    marketShare: 18.7,
    growth: -0.8,
    products: 28,
    sentiment: "Negative",
    score: 64,
  },
  {
    name: "DigitalAdvance",
    marketShare: 15.4,
    growth: 3.4,
    products: 31,
    sentiment: "Positive",
    score: 79,
  },
  {
    name: "FutureSystems",
    marketShare: 14.3,
    growth: 2.1,
    products: 24,
    sentiment: "Neutral",
    score: 68,
  },
];

// Format percent with + sign for positive values
const formatPercent = (value) => (value > 0 ? `+${value}%` : `${value}%`);

export default function CompetitorReport() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [insights, setInsights] = useState([]);
  const [completedSections, setCompletedSections] = useState(0);
  const totalSections = 4;

  // Inject scoped styles when component mounts
  useEffect(() => {
    const cleanup = injectStyles();
    return cleanup;
  }, []);

  // Animated loading effect
  useEffect(() => {
    if (loading) {
      // Simulate AI processing
      const timer1 = setTimeout(() => setCurrentStep(1), 600);
      const timer2 = setTimeout(() => setCurrentStep(2), 1400);
      const timer3 = setTimeout(() => setCurrentStep(3), 2200);
      const timer4 = setTimeout(() => {
        setLoading(false);
        setInsights([
          {
            title: "Market Dominance",
            content:
              "TechCorp Inc. maintains strong market leadership with 28.5% share, fueled by consistent product innovation and positive customer sentiment.",
            icon: <Award />,
            type: "key",
          },
          {
            title: "Growth Concerns",
            content:
              "InnovateTech's negative growth trend (-0.8%) signals potential market challenges, despite maintaining a sizeable market position.",
            icon: <AlertTriangle />,
            type: "warning",
          },
          {
            title: "Rising Competitor",
            content:
              "DigitalAdvance shows promising momentum with +3.4% growth, positioned to potentially overtake InnovateTech within 2-3 quarters.",
            icon: <TrendingUp />,
            type: "opportunity",
          },
        ]);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }

    // Animate sections appearing
    if (!loading) {
      const sectionInterval = setInterval(() => {
        setCompletedSections((prev) => {
          if (prev < totalSections) return prev + 1;
          clearInterval(sectionInterval);
          return prev;
        });
      }, 300);

      return () => clearInterval(sectionInterval);
    }
  }, [loading]);

  // Loading animation
  if (loading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div
            className="animate-pulse"
            style={{
              backgroundColor: theme.primary,
              height: "2rem",
              width: "2rem",
              borderRadius: "9999px",
              marginRight: "0.75rem",
            }}
          ></div>
          <h2 className="text-lg font-semibold" style={{ color: theme.dark }}>
            AI Analysis in Progress
          </h2>
        </div>

        <div className="space-y-3">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-full rounded"
              style={{
                backgroundColor: theme.primary,
                width: `${(currentStep / 3) * 100}%`,
                transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
          </div>

          <div className="text-sm" style={{ color: theme.dark }}>
            {currentStep === 0 && "Collecting competitor data..."}
            {currentStep === 1 && "Analyzing market patterns..."}
            {currentStep === 2 && "Identifying key insights..."}
            {currentStep === 3 && "Generating visualization models..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border rounded-lg p-6 shadow"
      style={{
        ...styles.transitionAll,
        backgroundColor: "white",
        borderColor: theme.secondary,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Zap style={{ color: theme.primary }} className="mr-2" size={20} />
          <h2 className="text-xl font-semibold" style={{ color: theme.dark }}>
            AI Competitor Analysis Report
          </h2>
        </div>
        <div className="text-xs" style={{ color: theme.dark }}>
          Generated on {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Market Distribution Visualization */}
      {completedSections >= 1 && (
        <div className="mb-8" style={styles.fadeIn}>
          <h3
            className="text-lg font-medium mb-3"
            style={{ color: theme.dark }}
          >
            Market Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitors}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.light} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: theme.dark }}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12, fill: theme.dark }}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Market Share"]}
                  labelStyle={{ fontWeight: "bold", color: theme.dark }}
                  contentStyle={{
                    backgroundColor: theme.light,
                    borderColor: theme.secondary,
                  }}
                />
                <Bar
                  dataKey="marketShare"
                  fill={theme.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Key Insights */}
      {completedSections >= 2 && (
        <div className="mb-8" style={styles.fadeIn}>
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: theme.dark }}
          >
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: theme.light,
                  borderColor:
                    insight.type === "warning"
                      ? "#F9BE51"
                      : insight.type === "key"
                      ? theme.primary
                      : "#48BB78",
                }}
              >
                <div className="flex items-center mb-2">
                  <div
                    className="p-1 rounded-full mr-2"
                    style={{
                      color:
                        insight.type === "warning"
                          ? "#D97706"
                          : insight.type === "key"
                          ? theme.primary
                          : "#059669",
                    }}
                  >
                    {insight.icon}
                  </div>
                  <h4 className="font-medium" style={{ color: theme.dark }}>
                    {insight.title}
                  </h4>
                </div>
                <p className="text-sm" style={{ color: theme.dark }}>
                  {insight.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Growth Performance */}
      {completedSections >= 3 && (
        <div className="mb-8" style={styles.fadeIn}>
          <h3
            className="text-lg font-medium mb-3"
            style={{ color: theme.dark }}
          >
            Growth Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={competitors}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.light} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: theme.dark }}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12, fill: theme.dark }}
                  />
                  <Tooltip
                    formatter={(value) => [formatPercent(value), "Growth Rate"]}
                    labelStyle={{ fontWeight: "bold", color: theme.dark }}
                    contentStyle={{
                      backgroundColor: theme.light,
                      borderColor: theme.secondary,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke={theme.primary}
                    strokeWidth={2}
                    dot={{ r: 4, fill: theme.primary }}
                    activeDot={{ r: 6, fill: theme.primary }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium" style={{ color: theme.dark }}>
                Growth Overview
              </h4>
              <div className="space-y-4">
                {competitors.map((comp, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            comp.growth > 0 ? theme.primary : "#E53E3E",
                        }}
                      ></div>
                      <span className="text-sm" style={{ color: theme.dark }}>
                        {comp.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: comp.growth > 0 ? theme.primary : "#E53E3E",
                        }}
                      >
                        {formatPercent(comp.growth)}
                      </span>
                      {comp.growth > 0 ? (
                        <ArrowUpRight
                          size={14}
                          className="ml-1"
                          style={{ color: theme.primary }}
                        />
                      ) : (
                        <ArrowDownRight
                          size={14}
                          className="ml-1"
                          style={{ color: "#E53E3E" }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Strategic Recommendations */}
      {completedSections >= 4 && (
        <div style={styles.fadeIn}>
          <h3
            className="text-lg font-medium mb-3"
            style={{ color: theme.dark }}
          >
            Strategic Recommendations
          </h3>
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: theme.light,
              borderColor: theme.secondary,
              border: "1px solid",
            }}
          >
            <ol
              className="space-y-3 list-decimal list-inside"
              style={{ color: theme.dark }}
            >
              <li className="ml-2">
                <span className="font-medium">
                  Focus on TechCorp Inc.'s innovation pipeline
                </span>{" "}
                - Their high product count (42) correlates strongly with market
                leadership.
              </li>
              <li className="ml-2">
                <span className="font-medium">
                  Monitor DigitalAdvance's growth trajectory
                </span>{" "}
                - With the second-highest growth rate, they represent both a
                threat and potential strategic partnership opportunity.
              </li>
              <li className="ml-2">
                <span className="font-medium">
                  Consider InnovateTech's product portfolio for acquisition
                </span>{" "}
                - Their negative growth trend may present favorable negotiation
                conditions despite their established market position.
              </li>
              <li className="ml-2">
                <span className="font-medium">
                  Implement customer sentiment improvement strategy
                </span>{" "}
                - Positive sentiment correlates with 87% of high-growth
                competitors.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Report footer */}
      <div
        className="mt-6 text-xs border-t pt-3 flex items-center justify-between"
        style={{ borderColor: theme.secondary, color: theme.dark }}
      >
        <div>Confidence score: 92% • Competitive intelligence report</div>
        <div className="flex items-center">
          <Zap size={12} className="mr-1" style={{ color: theme.primary }} />
          <span>Powered by AI Analysis Engine</span>
        </div>
      </div>
    </div>
  );
}
