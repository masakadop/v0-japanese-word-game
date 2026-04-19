import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { ArrowRight, PenLine, Vote, Sparkles } from "lucide-react";

// Sample featured prompt
const featuredOdai = {
  id: "spring-2024",
  maeku: ["春風に", "心揺れつつ"],
  theme: "春の訪れ",
  submissionCount: 42,
  deadline: "2024年4月30日",
};

// Sample recent submissions for display
const recentSubmissions = [
  {
    id: 1,
    ku: ["桜散る", "窓辺に猫の", "あくびかな"],
    author: "風月庵",
    votes: 12,
  },
  {
    id: 2,
    ku: ["遠山に", "霞たなびく", "朝の道"],
    author: "青葉堂",
    votes: 8,
  },
  {
    id: 3,
    ku: ["花の雨", "傘を忘れた", "二人連れ"],
    author: "月草",
    votes: 15,
  },
];

export default function EntrancePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/50">
          <div className="washi-texture absolute inset-0 opacity-50" />
          <div className="relative mx-auto max-w-4xl px-4 py-16 md:py-24">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-kincha" />
                <span>江戸から続く言葉遊び</span>
              </div>

              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="text-balance">
                  七七のお題に、
                  <br className="hidden sm:inline" />
                  五七五で応える
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                前句付けは、江戸時代に庶民の間で親しまれた言葉遊び。
                与えられた七七の「前句」に、五七五の上句を付けて一首の短歌を完成させます。
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/submit">
                    <PenLine className="h-4 w-4" />
                    投句する
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/vote">
                    <Vote className="h-4 w-4" />
                    選句を見る
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Odai Section */}
        <section className="border-b border-border/50 bg-card/50">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-shu">今月のお題</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold">
                  {featuredOdai.theme}
                </h2>
              </div>
              <Link
                href="/odai"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                お題一覧
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <Card className="overflow-hidden border-2 border-ai/20 bg-card">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Vertical text display */}
                  <div className="flex items-center justify-center border-b border-border/50 bg-kinari/50 p-8 md:border-b-0 md:border-r md:p-12">
                    <div className="tategaki font-serif text-2xl leading-loose tracking-widest md:text-3xl">
                      {featuredOdai.maeku.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        前句（まえく）
                      </p>
                      <p className="mt-2 font-serif text-xl">
                        {featuredOdai.maeku.join("　")}
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground">
                        この七七に続く五七五の上句を付けて、
                        一首の短歌を完成させてください。
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-6">
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">投句数</span>
                          <span className="ml-2 font-medium">
                            {featuredOdai.submissionCount}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">締切</span>
                          <span className="ml-2 font-medium">
                            {featuredOdai.deadline}
                          </span>
                        </div>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/submit?odai=${featuredOdai.id}`}>
                          投句する
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Submissions */}
        <section className="border-b border-border/50">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-ai">最近の投句</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold">
                  みなさまの句
                </h2>
              </div>
              <Link
                href="/vote"
                className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                選句へ
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {recentSubmissions.map((submission) => (
                <Card
                  key={submission.id}
                  className="group transition-all hover:border-ai/30 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="tategaki h-32 font-serif text-lg leading-relaxed">
                        {submission.ku.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ink-border flex items-center justify-between pt-4">
                      <span className="text-sm text-muted-foreground">
                        {submission.author}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Vote className="h-3.5 w-3.5" />
                        {submission.votes}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-card/30">
          <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium text-kincha">はじめての方へ</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold">
                前句付けの遊び方
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "一",
                  title: "お題を選ぶ",
                  description:
                    "毎月出される七七の「前句」から、心に響くお題を選びます。",
                },
                {
                  step: "二",
                  title: "句を詠む",
                  description:
                    "前句に続く五七五の上句を考え、一首の短歌として完成させます。",
                },
                {
                  step: "三",
                  title: "選句する",
                  description:
                    "他の人の句を読み、心に残った句に投票。月末に秀句が選ばれます。",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-lg border border-border/50 bg-card p-6"
                >
                  <div className="absolute -top-3 left-4">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ai font-serif text-xs text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="hanko">句</span>
              <span className="font-serif text-sm">前句付け</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              江戸の粋を、現代に。言葉で遊ぶ、心を磨く。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
