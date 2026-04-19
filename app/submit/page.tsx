"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";

// Sample prompts/odai
const availableOdai = [
  {
    id: "spring-2024",
    maeku: ["春風に", "心揺れつつ"],
    theme: "春の訪れ",
    deadline: "2024年4月30日",
  },
  {
    id: "memory-2024",
    maeku: ["思い出の", "色褪せぬまま"],
    theme: "記憶",
    deadline: "2024年5月15日",
  },
  {
    id: "rain-2024",
    maeku: ["雨音に", "耳を澄ませば"],
    theme: "雨の日",
    deadline: "2024年5月31日",
  },
];

// Syllable counting helper (simplified for Japanese)
function countMora(text: string): number {
  // Remove spaces and count characters
  // In a real implementation, this would handle small kana (ゃゅょ etc.)
  const cleaned = text.replace(/[\s　]/g, "");
  // Count small kana as part of previous mora
  const smallKana = /[ゃゅょャュョぁぃぅぇぉァィゥェォっッ]/g;
  const smallKanaCount = (cleaned.match(smallKana) || []).length;
  return cleaned.length - smallKanaCount;
}

export default function SubmitPage() {
  const [selectedOdai, setSelectedOdai] = useState(availableOdai[0]);
  const [lines, setLines] = useState({ first: "", second: "", third: "" });
  const [penName, setPenName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const moraCounts = {
    first: countMora(lines.first),
    second: countMora(lines.second),
    third: countMora(lines.third),
  };

  const idealCounts = { first: 5, second: 7, third: 5 };

  const isValidMora = (line: keyof typeof lines) => {
    const count = moraCounts[line];
    const ideal = idealCounts[line];
    return count >= ideal - 1 && count <= ideal + 1;
  };

  const canSubmit =
    lines.first.trim() &&
    lines.second.trim() &&
    lines.third.trim() &&
    penName.trim() &&
    isValidMora("first") &&
    isValidMora("second") &&
    isValidMora("third");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ai/10">
              <Check className="h-8 w-8 text-ai" />
            </div>
            <h1 className="font-serif text-2xl font-semibold">
              投句ありがとうございます
            </h1>
            <p className="mt-4 text-muted-foreground">
              あなたの句が受け付けられました。
              <br />
              選句の結果は月末にお知らせいたします。
            </p>

            <Card className="mx-auto mt-8 max-w-sm">
              <CardContent className="p-6">
                <div className="flex justify-center">
                  <div className="tategaki font-serif text-xl leading-loose">
                    <span className="block">{lines.first}</span>
                    <span className="block">{lines.second}</span>
                    <span className="block">{lines.third}</span>
                    <span className="mt-2 block text-muted-foreground">
                      {selectedOdai.maeku[0]}
                    </span>
                    <span className="block text-muted-foreground">
                      {selectedOdai.maeku[1]}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  ― {penName}
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setLines({ first: "", second: "", third: "" });
                }}
              >
                もう一句詠む
              </Button>
              <Button asChild>
                <Link href="/vote">選句を見る</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          入口に戻る
        </Link>

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold">投句する</h1>
          <p className="mt-2 text-muted-foreground">
            お題の前句に続く五七五の上句を詠んでください
          </p>
        </div>

        {/* Odai Selection */}
        <section className="mb-8">
          <Label className="mb-3">お題を選ぶ</Label>
          <div className="grid gap-3">
            {availableOdai.map((odai) => (
              <button
                key={odai.id}
                type="button"
                onClick={() => setSelectedOdai(odai)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  selectedOdai.id === odai.id
                    ? "border-ai bg-ai/5 ring-1 ring-ai/20"
                    : "border-border hover:border-ai/30 hover:bg-card"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{odai.theme}</p>
                    <p className="mt-1 font-serif text-lg">
                      {odai.maeku.join("　")}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    締切: {odai.deadline}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Selected Odai Display */}
        <Card className="mb-8 overflow-hidden border-2 border-ai/20">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center justify-center border-b border-border/50 bg-kinari/50 p-6 md:border-b-0 md:border-r md:p-8">
                <div className="tategaki font-serif text-xl leading-loose tracking-widest md:text-2xl">
                  {selectedOdai.maeku.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-6">
                <p className="text-sm text-muted-foreground">
                  選択中のお題: {selectedOdai.theme}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  この七七の前句に、五七五の上句を付けてください。
                  <br />
                  上句と前句を合わせて、一首の短歌になります。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Form */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <Label className="mb-3">上句（五七五）</Label>
                <div className="space-y-4">
                  {(["first", "second", "third"] as const).map((line, idx) => {
                    const labels = ["初句（五）", "二句（七）", "三句（五）"];
                    const placeholders = [
                      "桜散る",
                      "窓辺に猫の",
                      "あくびかな",
                    ];
                    const count = moraCounts[line];
                    const ideal = idealCounts[line];
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
                            {count < ideal
                              ? `あと${ideal - count}拍足りません`
                              : `${count - ideal}拍多いようです`}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Preview */}
              {(lines.first || lines.second || lines.third) && (
                <div className="mb-6 rounded-lg border border-border/50 bg-kinari/30 p-4">
                  <p className="mb-2 text-xs text-muted-foreground">
                    完成イメージ
                  </p>
                  <div className="flex justify-center py-2">
                    <div className="tategaki font-serif text-lg leading-loose">
                      <span className="block">
                        {lines.first || "＿＿＿＿＿"}
                      </span>
                      <span className="block">
                        {lines.second || "＿＿＿＿＿＿＿"}
                      </span>
                      <span className="block">
                        {lines.third || "＿＿＿＿＿"}
                      </span>
                      <span className="mt-1 block text-muted-foreground">
                        {selectedOdai.maeku[0]}
                      </span>
                      <span className="block text-muted-foreground">
                        {selectedOdai.maeku[1]}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <Label htmlFor="penName" className="mb-1.5">
                  俳号（ペンネーム）
                </Label>
                <Input
                  id="penName"
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  placeholder="風月庵"
                  className="max-w-xs"
                />
              </div>

              <Button type="submit" disabled={!canSubmit} className="w-full">
                投句する
              </Button>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
