"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { ArrowLeft, Heart, ChevronDown, Trophy, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for voting
const odaiForVoting = {
  id: "spring-2024",
  maeku: ["春風に", "心揺れつつ"],
  theme: "春の訪れ",
};

const submissions = [
  {
    id: 1,
    ku: ["桜散る", "窓辺に猫の", "あくびかな"],
    author: "風月庵",
    votes: 24,
    isTopVoted: true,
  },
  {
    id: 2,
    ku: ["遠山に", "霞たなびく", "朝の道"],
    author: "青葉堂",
    votes: 18,
    isTopVoted: false,
  },
  {
    id: 3,
    ku: ["花の雨", "傘を忘れた", "二人連れ"],
    author: "月草",
    votes: 31,
    isTopVoted: true,
  },
  {
    id: 4,
    ku: ["鶯の", "声に目覚める", "里の朝"],
    author: "翠風",
    votes: 12,
    isTopVoted: false,
  },
  {
    id: 5,
    ku: ["蝶ひとつ", "追いかけて行く", "子の笑顔"],
    author: "花月",
    votes: 15,
    isTopVoted: false,
  },
  {
    id: 6,
    ku: ["若草の", "香り運びて", "風そよぐ"],
    author: "清流",
    votes: 9,
    isTopVoted: false,
  },
  {
    id: 7,
    ku: ["梅一輪", "ほころぶ庭に", "朝日差す"],
    author: "白雲",
    votes: 22,
    isTopVoted: false,
  },
  {
    id: 8,
    ku: ["春告げる", "雪解けの音", "川下る"],
    author: "碧水",
    votes: 8,
    isTopVoted: false,
  },
];

type SortOption = "votes" | "newest" | "random";

export default function VotePage() {
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const [localVotes, setLocalVotes] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState<SortOption>("votes");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const toggleVote = (id: number) => {
    const newVotedIds = new Set(votedIds);
    const newLocalVotes = { ...localVotes };

    if (votedIds.has(id)) {
      newVotedIds.delete(id);
      newLocalVotes[id] = (newLocalVotes[id] || 0) - 1;
    } else {
      newVotedIds.add(id);
      newLocalVotes[id] = (newLocalVotes[id] || 0) + 1;
    }

    setVotedIds(newVotedIds);
    setLocalVotes(newLocalVotes);
  };

  const getVoteCount = (submission: (typeof submissions)[0]) => {
    return submission.votes + (localVotes[submission.id] || 0);
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (sortBy === "votes") {
      return getVoteCount(b) - getVoteCount(a);
    }
    if (sortBy === "newest") {
      return b.id - a.id;
    }
    // Random - use a seeded random based on id
    return 0.5 - Math.random();
  });

  const sortLabels: Record<SortOption, string> = {
    votes: "人気順",
    newest: "新着順",
    random: "ランダム",
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

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold">選句する</h1>
          <p className="mt-2 text-muted-foreground">
            心に響いた句に投票してください
          </p>
        </div>

        {/* Current Odai */}
        <Card className="mb-8 overflow-hidden border-ai/20">
          <CardContent className="p-0">
            <div className="flex items-center gap-6 p-6">
              <div className="flex items-center justify-center rounded-lg bg-kinari/50 p-4">
                <div className="tategaki font-serif text-lg leading-loose">
                  {odaiForVoting.maeku.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-shu">今月のお題</p>
                <p className="mt-1 font-serif text-xl">{odaiForVoting.theme}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {submissions.length}句の投句があります
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sort Controls */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {votedIds.size > 0 && (
              <span className="text-ai">{votedIds.size}句に投票中</span>
            )}
          </p>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {sortLabels[sortBy]}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full z-10 mt-1 rounded-md border border-border bg-card py-1 shadow-lg">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortMenu(false);
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted",
                      sortBy === option && "text-ai"
                    )}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submissions Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {sortedSubmissions.map((submission, index) => {
            const voteCount = getVoteCount(submission);
            const isVoted = votedIds.has(submission.id);
            const isTop3 = sortBy === "votes" && index < 3;

            return (
              <Card
                key={submission.id}
                className={cn(
                  "group relative transition-all",
                  isVoted && "border-shu/30 bg-shu/5",
                  isTop3 && !isVoted && "border-kincha/30"
                )}
              >
                {isTop3 && (
                  <div className="absolute -top-2 right-4">
                    {index === 0 ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-kincha text-white">
                        <Trophy className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-kincha/20 text-kincha">
                        <Flame className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                )}
                <CardContent className="p-6">
                  {/* Poem Display */}
                  <div className="mb-4 flex justify-center">
                    <div className="tategaki h-28 font-serif text-lg leading-relaxed">
                      {submission.ku.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & Vote */}
                  <div className="ink-border flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">
                      {submission.author}
                    </span>
                    <button
                      onClick={() => toggleVote(submission.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all",
                        isVoted
                          ? "bg-shu text-white"
                          : "bg-muted text-muted-foreground hover:bg-shu/10 hover:text-shu"
                      )}
                    >
                      <Heart
                        className={cn("h-4 w-4", isVoted && "fill-current")}
                      />
                      <span>{voteCount}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Submit CTA */}
        <Card className="mt-8 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">
              あなたも一句、詠んでみませんか？
            </p>
            <Button asChild className="mt-4">
              <Link href="/submit">投句する</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
