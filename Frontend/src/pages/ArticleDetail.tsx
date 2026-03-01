import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  FileText, 
  ExternalLink, 
  Link2, 
  Calendar, 
  Clock, 
  Users, 
  Building2,
  Quote,
  ChevronRight
} from "lucide-react";
import { getArticleBySlug, articles, getFeaturedArticles } from "@/data/articleContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");
  const featuredArticles = getFeaturedArticles().filter(a => a.slug !== slug).slice(0, 3);
  

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <section className="pt-24 pb-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/articles" className="hover:text-primary transition-colors">Articles</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-muted-foreground truncate max-w-[200px]">
                  {article.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Article Header */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Type Badge */}
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              {article.type}
            </Badge>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Authors */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">
                  {article.authors.map((author, i) => (
                    <span key={i}>
                      <span className="text-foreground font-medium hover:text-primary cursor-pointer transition-colors">
                        {author.name}
                      </span>
                      {i < article.authors.length - 1 && ", "}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            {/* Affiliations */}
            <div className="flex flex-wrap gap-3 mb-6">
              {article.authors.map((author, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span>{author.affiliation}</span>
                </div>
              ))}
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>{article.journal}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
              {article.citations && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <Quote className="h-4 w-4" />
                    <span>{article.citations} citations</span>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {article.pdfUrl && (
                <Button variant="default" asChild className="gap-2">
                  <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              )}
              {article.doi && (
                <Button variant="outline" asChild className="gap-2">
                  <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer">
                    <Link2 className="h-4 w-4" />
                    DOI: {article.doi}
                  </a>
                </Button>
              )}
              {article.externalUrl && (
                <Button variant="outline" asChild className="gap-2">
                  <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View External
                  </a>
                </Button>
              )}
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <Badge 
                  key={keyword} 
                  variant="secondary" 
                  className="bg-secondary/80 hover:bg-secondary transition-colors cursor-pointer"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Abstract Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h2 className="font-display text-xl font-semibold mb-4 text-primary">Abstract</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {article.abstract}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              {article.sections.map((section, index) => (
                <div key={index} className="mb-12">
                  <h2 className="font-display text-2xl font-semibold mb-4 text-foreground flex items-center gap-3">
                    <span className="text-primary text-lg font-mono">{String(index + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-base leading-7">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>


      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold">Featured Research</h2>
                <Button variant="ghost" asChild className="gap-2">
                  <Link to="/articles">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArticles.map((featured) => (
                  <Link 
                    key={featured.slug}
                    to={`/articles/${featured.slug}`}
                    className="glass rounded-xl p-6 card-hover group"
                  >
                    <Badge variant="outline" className="mb-3 border-primary/30 text-primary text-xs">
                      {featured.type}
                    </Badge>
                    <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {featured.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {featured.abstract}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Quote className="h-3 w-3" />
                      <span>{featured.citations} citations</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ArticleDetail;
