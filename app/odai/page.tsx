"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Users,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample existing prompts
const existingOdai = [
  {
    id: "spring-2024",
    maeku: ["春の風吹き", "心揺れつつ"],
    theme: "春の訪れ",
    status: "active",
    submissionCount: 42,
    deadline: "2024年4月30日",
    createdBy: "運営",
  },
  {
    id: "memory-2024",
    maeku: ["思い出深く", "色褪せぬまま"],
    theme: "記憶",
    status: "active",
    submissionCount: 28,
    deadline: "2024年5月15日",
    createdBy: "月草",
  },
  {
    id: "rain-2024",
    maeku: ["雨の音聞き", "耳を澄ませば"],
    theme: "雨の日",
    status: "upcoming",
    submissionCount: 0,
    deadline: "2024年5月31日",
    createdBy: "運営",
  },
  {
    id: "winter-2023",
    maeku: ["雪しんしんと", "静まる街に"],
    theme: "冬の夜",
    status: "closed",
    submissionCount: 67,
    deadline: "2024年2月28日",
    createdBy: "青葉堂",
  },
  {
    id: "moon-2023",
    maeku: ["月の明かりが", "照らす道行き"],
    theme: "月夜",
    status: "closed",
    submissionCount: 53,
    deadline: "2024年1月31日",
    createdBy: "運営",
  },
];

// Syllable counting helper
function countMora(text: string): number {
  const cleaned = text.replace(/[\s　]/g, "");
  const smallKana = /[ゃゅょャュョぁぃぅぇぉァィゥェォっッ]/g;
  const smallKanaCount = (cleaned.match(smallKana) || []).length;
  return cleaned.length - smallKanaCount;
}

export default function OdaiPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [lines, setLines] = useState({ first: "", second: "" });
  const [theme, setTheme] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all");

  const moraCounts = {
    first: countMora(lines.first),
    second: countMora(lines.second),
  };

  const isValidMora = (line: "first" | "second") => {
    const count = moraCounts[line];
    return count >= 6 && count <= 8; // Allow 7 ± 1
  };

  const canSubmit =
    lines.first.trim() &&
    lines.second.trim() &&
    theme.trim() &&
    isValidMora("first") &&
    isValidMora("second");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      setSubmitted(true);
      setShowCreateForm(false);
    }
  };

  const filteredOdai = existingOdai.filter((odai) => {
    if (filter === "all") return true;
    if (filter === "active")
      return odai.status === "active" || odai.status === "upcoming";
    return odai.status === "closed";
  });

  const statusLabels = {
    active: { label: "募集中", color: "text-ai bg-ai/10" },
    upcoming: { label: "近日開始", color: "text-kincha bg-kincha/10" },
    closed: { label: "終了", color: "text-muted-foreground bg-muted" },
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          入口に戻る
        </Link>

        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">お題一覧</h1>
            <p className="mt-2 text-muted-foreground">
              投句できるお題と過去のお題
            </p>
          </div>
          {!showCreateForm && (
            <Button
              onClick={() => setShowCreateForm(true)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              お題を作る
            </Button>
          )}
        </div>

        {/* Success Message */}
        {submitted && (
          <Card className="mb-6 border-ai/30 bg-ai/5">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ai/20">
                <Check className="h-4 w-4 text-ai" />
              </div>
              <div>
                <p className="font-medium">お題を提案しました</p>
                <p className="text-sm text-muted-foreground">
                  審査後、公開されます
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <Card className="mb-8 border-2 border-ai/20">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ai" />
                <h2 className="font-serif text-xl font-semibold">
                  新しいお題を作る
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Label className="mb-3">前句（七七）</Label>
                  <p className="mb-3 text-sm text-muted-foreground">
                    投句者が五七五を付ける、七七の前句を作成してください
                  </p>
                  <div className="space-y-4">
                    {(["first", "second"] as const).map((line, idx) => {
                      const labels = ["上の句（七）", "下の句（七）"];
                      const placeholders = ["春の風吹き", "心揺れつつ"];
                      const count = moraCounts[line];
                      const isValid = isValidMora(line);
                      const hasContent = lines[line].trim().length > 0;

                      return (
                        <div key={line}>
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {labels[idx]}
                            </span>
                            <span
                              className={`text-xs ${
                                hasContent
                                  ? isValid
                                    ? "text-ai"
                                    : "text-shu"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {count}拍
                            </span>
                          </div>
                          <div className="relative">
                            <Input
                              value={lines[line]}
                              onChange={(e) =>
                                setLines({ ...lines, [line]: e.target.value })
                              }
                              placeholder={placeholders[idx]}
                              className="font-serif text-lg"
                            />
                            {hasContent && !isValid && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <AlertCircle className="h-4 w-4 text-shu" />
                              </div>
                            )}
                          </div>
                          {hasContent && !isValid && (
                            <p className="mt-1 text-xs text-shu">
                              {count < 7
                                ? `あと${7 - count}拍足りません`
                                : `${count - 7}拍多いようです`}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preview */}
                {(lines.first || lines.second) && (
                  <div className="mb-6 rounded-lg border border-border/50 bg-kinari/30 p-4">
                    <p className="mb-2 text-xs text-muted-foreground">
                      前句プレビュー
                    </p>
                    <div className="flex justify-center py-2">
                      <div className="tategaki font-serif text-lg leading-loose">
                        <span className="block">
                          {lines.first || "＿＿＿＿＿＿＿"}
                        </span>
                        <span className="block">
                          {lines.second || "＿＿＿＿＿＿＿"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <Label htmlFor="theme" className="mb-1.5">
                    お題のテーマ
                  </Label>
                  <Input
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="春の訪れ"
                    className="max-w-xs"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    お題を一言で表すテーマを入力してください
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={!canSubmit}>
                    お題を提案する
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowCreateForm(false);
                      setLines({ first: "", second: "" });
                      setTheme("");
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          {(["all", "active", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-colors",
                filter === f
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "すべて" : f === "active" ? "募集中" : "過去"}
            </button>
          ))}
        </div>

        {/* Odai List */}
        <div className="space-y-4">
          {filteredOdai.map((odai) => (
            <Card
              key={odai.id}
              className={cn(
                "transition-all",
                odai.status === "closed" && "opacity-70"
              )}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Vertical text display */}
                  <div className="flex items-center justify-center border-b border-border/50 bg-kinari/30 p-6 md:border-b-0 md:border-r md:p-8">
                    <div className="tategaki font-serif text-lg leading-loose md:text-xl">
                      {odai.maeku.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            statusLabels[odai.status].color
                          )}
                        >
                          {statusLabels[odai.status].label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          作成: {odai.createdBy}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-medium">
                        {odai.theme}
                      </h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {odai.submissionCount}句
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {odai.deadline}
                        </span>
                      </div>
                      {odai.status === "active" && (
                        <Button asChild size="sm">
                          <Link href={`/submit?odai=${odai.id}`}>投句する</Link>
                        </Button>
                      )}
                      {odai.status === "closed" && (
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/vote?odai=${odai.id}`}>結果を見る</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOdai.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              該当するお題がありません
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
