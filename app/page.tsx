"use client";

import { useState } from "react";

type AnalysisResult = {
  koreaScore: number;
  globalScore: number;
  gapScore: number;
  summary: string;
  strengths: string[];
  risks: string[];
  improvement: string;
};

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  function analyzeIdea() {
    if (!idea.trim()) {
      alert("아이디어를 먼저 입력해주세요.");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        koreaScore: 72,
        globalScore: 84,
        gapScore: 87,
        summary:
          "현재 아이디어는 해외 시장에서 검증 가능성이 있으며, 국가별 경쟁 수준에 따라 사업 기회가 달라질 수 있습니다.",
        strengths: [
          "해외 시장에서 검증된 사업모델을 활용할 수 있음",
          "국가별 경쟁 수준을 비교할 수 있음",
          "현지화에 따라 차별화 가능성이 있음",
        ],
        risks: [
          "실제 경쟁사가 존재할 가능성이 있음",
          "국가별 규제와 문화 차이를 추가 검토해야 함",
          "AI 분석만으로 성공을 보장할 수 없음",
        ],
        improvement:
          "초기에는 특정 국가 1~2곳을 선정하여 실제 고객 반응을 먼저 테스트하는 것을 권장합니다.",
      });

      setLoading(false);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              GLOBAL GAP AI
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              세계 시장의 사업 공백을 찾아주는 AI
            </p>
          </div>

          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium">
            Beta
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🌎 Global Business Opportunity Finder
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            당신의 아이디어가
            <br />
            <span className="text-blue-600">어느 나라에서 기회</span>가 될까요?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            아이디어를 입력하면 시장성, 경쟁사, 한국 점수,
            글로벌 점수와 국가별 사업 기회를 분석합니다.
          </p>

          <div className="mt-10 rounded-2xl border bg-white p-4 shadow-lg">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="예: 일본에서 성공한 반려동물 AI 서비스를 베트남에서 운영하고 싶습니다."
              className="min-h-32 w-full resize-none rounded-xl border border-slate-200 p-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-left text-sm text-slate-400">
                {loading ? "AI가 아이디어를 분석하고 있습니다..." : "현재는 테스트 분석입니다."}
              </p>

              <button
                type="button"
                onClick={analyzeIdea}
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "🔄 분석 중..." : "🔍 AI 사업성 분석"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-4">
          <FeatureCard
            title="한국 점수"
            description="한국 시장에서의 사업 가능성을 분석합니다."
            icon="🇰🇷"
          />

          <FeatureCard
            title="글로벌 점수"
            description="세계 시장을 기준으로 사업 가능성을 분석합니다."
            icon="🌎"
          />

          <FeatureCard
            title="시장 GAP"
            description="어느 나라에서 경쟁이 약한지 찾아냅니다."
            icon="📊"
          />

          <FeatureCard
            title="AI 개선"
            description="아이디어를 더 좋은 사업 모델로 발전시킵니다."
            icon="💡"
          />
        </div>

        {result && (
          <section className="mt-16 rounded-2xl border bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold text-blue-600">
              ANALYSIS RESULT
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              분석 결과가 나왔습니다.
            </h3>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <ScoreCard label="한국 점수" score={result.koreaScore} />
              <ScoreCard label="글로벌 점수" score={result.globalScore} />
              <ScoreCard label="시장 GAP" score={result.gapScore} />
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-6">
              <h4 className="font-bold">AI 분석 요약</h4>
              <p className="mt-3 leading-7 text-slate-600">
                {result.summary}
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <AnalysisList
                title="강점"
                items={result.strengths}
              />

              <AnalysisList
                title="주의사항"
                items={result.risks}
              />
            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-6">
              <h4 className="font-bold text-blue-800">
                💡 AI 개선 제안
              </h4>

              <p className="mt-3 leading-7 text-blue-900">
                {result.improvement}
              </p>
            </div>
          </section>
        )}
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-400">
          GLOBAL GAP AI · AI 기반 글로벌 사업 기회 탐색 플랫폼
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function ScoreCard({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 text-center">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-bold text-blue-600">
        {score}
      </p>
      <p className="mt-1 text-xs text-slate-400">/ 100</p>
    </div>
  );
}

function AnalysisList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border p-6">
      <h4 className="font-bold">{title}</h4>

      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}