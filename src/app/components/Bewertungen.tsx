import { Star, ThumbsUp, MessageCircle, TrendingUp, Instagram, Facebook, StarIcon } from 'lucide-react';

interface Review {
  id: string;
  platform: 'google' | 'facebook' | 'instagram';
  author: string;
  rating: number;
  date: string;
  text: string;
  response?: string;
}

export function Bewertungen() {
  const reviews: Review[] = [
    {
      id: '1',
      platform: 'google',
      author: 'Max Müller',
      rating: 5,
      date: 'Heute',
      text: 'Hervorragendes Essen! Die Pizza war perfekt und der Service sehr aufmerksam. Kommen gerne wieder!',
      response: 'Vielen Dank für die tolle Bewertung! Wir freuen uns auf Ihren nächsten Besuch.'
    },
    {
      id: '2',
      platform: 'google',
      author: 'Sarah Schmidt',
      rating: 5,
      date: 'Gestern',
      text: 'Beste italienische Küche in Berlin! Sehr authentisch und preislich fair.',
    },
    {
      id: '3',
      platform: 'facebook',
      author: 'Peter Wagner',
      rating: 4,
      date: 'vor 2 Tagen',
      text: 'Gutes Essen, nette Atmosphäre. Nur die Wartezeit war etwas lang an dem Abend.',
    },
    {
      id: '4',
      platform: 'google',
      author: 'Lisa Meier',
      rating: 5,
      date: 'vor 3 Tagen',
      text: 'Wunderbare Weinauswahl und das Personal ist super freundlich!',
      response: 'Danke Lisa! Ihr Feedback bedeutet uns sehr viel.'
    },
    {
      id: '5',
      platform: 'instagram',
      author: '@foodie_berlin',
      rating: 5,
      date: 'vor 4 Tagen',
      text: 'Amazing pasta! Must visit if you\'re in Berlin 🍝✨',
    },
    {
      id: '6',
      platform: 'google',
      author: 'Thomas Klein',
      rating: 3,
      date: 'vor 5 Tagen',
      text: 'Essen war okay, aber Service könnte besser sein.',
    },
  ];

  const stats = {
    avgRating: 4.7,
    totalReviews: 342,
    thisWeek: 8,
    responseRate: 94,
    trend: '+0.2'
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ fontWeight: 'var(--font-weight-bold)' }}>G</div>;
      case 'facebook':
        return <div className="bg-gradient-to-br from-[#1877f2] to-[#0d5dbf] text-white w-9 h-9 rounded-xl flex items-center justify-center"><Facebook size={18} /></div>;
      case 'instagram':
        return <div className="bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white w-9 h-9 rounded-xl flex items-center justify-center"><Instagram size={18} /></div>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? 'fill-chart-3 text-chart-3' : 'fill-muted text-muted'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-secondary via-secondary to-chart-2 text-secondary-foreground px-5 pt-6 pb-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl flex items-center gap-2">
            <StarIcon size={24} />
            Bewertungen
          </h1>
        </div>
        <p className="text-sm opacity-90">{stats.totalReviews} Bewertungen insgesamt</p>
      </div>

      <div className="flex-1 overflow-auto px-4 -mt-4 pb-4 space-y-4">
        {/* Stats Overview */}
        <div className="bg-gradient-to-br from-primary/10 to-chart-1/10 border border-primary/20 rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                  {stats.avgRating}
                </span>
                <div className="mb-2">
                  <span className="text-primary text-sm bg-primary/20 px-2 py-0.5 rounded-full" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    {stats.trend}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                {renderStars(5)}
              </div>
              <span className="text-xs text-muted-foreground">Basierend auf {stats.totalReviews} Bewertungen</span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end text-primary mb-1">
                <TrendingUp size={18} />
                <span className="text-2xl" style={{ fontWeight: 'var(--font-weight-bold)' }}>+{stats.thisWeek}</span>
              </div>
              <span className="text-xs text-muted-foreground">diese Woche</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
              <div className="bg-primary/20 text-primary w-10 h-10 rounded-lg flex items-center justify-center">
                <ThumbsUp size={18} />
              </div>
              <div>
                <div className="text-lg" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                  {stats.responseRate}%
                </div>
                <div className="text-xs text-muted-foreground">Antwortrate</div>
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
              <div className="bg-chart-2/20 text-chart-2 w-10 h-10 rounded-lg flex items-center justify-center">
                <MessageCircle size={18} />
              </div>
              <div>
                <div className="text-lg" style={{ fontWeight: 'var(--font-weight-bold)' }}>
                  2.3h
                </div>
                <div className="text-xs text-muted-foreground">Ø Antwortzeit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="mb-3 px-1">Neueste Bewertungen</h3>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  {getPlatformIcon(review.platform)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4>{review.author}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{review.date}</span>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {review.text}
                </p>

                {review.response && (
                  <div className="bg-muted/50 border-l-2 border-primary rounded-lg p-3 mb-3">
                    <div className="text-xs text-primary mb-1" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      Ihre Antwort
                    </div>
                    <p className="text-sm">{review.response}</p>
                  </div>
                )}

                {!review.response && (
                  <button className="text-primary text-sm hover:underline" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                    Antworten
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
