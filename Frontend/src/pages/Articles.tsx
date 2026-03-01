import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { articles, getFeaturedArticles } from "@/data/articleContent";
import workshopLogo from "@/assets/articles/workshop.jpeg";
import conferenceLogo from "@/assets/articles/conference.jpeg";
import reviewJournalLogo from "@/assets/articles/review-journal.png";

const getArticleTypeLogo = (type: string) => {
  switch (type) {
    case "Workshop Paper":
      return workshopLogo;
    case "Conference Paper":
      return conferenceLogo;
    case "Review/Journal":
      return reviewJournalLogo;
    case "Research Paper":
    default:
      return conferenceLogo;
  }
};

const featuredArticles = articles.slice(0, 3);

const Articles = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Research <span className="text-gradient">Articles</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Academic articles and research summaries exploring the technical foundations 
              and current challenges in SAR image colorization.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredArticles.length > 0 && (
        <section className="py-12 bg-gradient-card">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-2xl font-bold mb-8 text-center">
                Featured <span className="text-gradient">Research</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/articles/${article.slug}`}
                    className="glass rounded-xl p-6 card-hover group block"
                  >
                    <Badge variant="outline" className="mb-3 border-primary/30 text-primary text-xs">
                      {article.type}
                    </Badge>
                    <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.abstract}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Quote className="h-3 w-3" />
                      <span>{article.citations} citations</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-8">
              All Articles
            </h2>
            <div className="grid gap-8">
              {articles.map((article) => (
                <article key={article.slug} className="glass rounded-2xl p-8 card-hover group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={getArticleTypeLogo(article.type)} 
                        alt={article.type}
                        className="h-14 w-14 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-primary font-medium">{article.type}</span>
                        {article.citations && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Quote className="h-3 w-3" />
                            {article.citations} citations
                          </span>
                        )}
                      </div>
                      <h2 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {article.authors.map(a => a.name).join(", ")} • {article.journal} • {article.year}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{article.abstract}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.keywords.map((keyword) => (
                      <span key={keyword} className="px-3 py-1 rounded-full text-xs bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="group-hover:border-primary group-hover:text-primary" asChild>
                    <Link to={`/articles/${article.slug}`}>
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
