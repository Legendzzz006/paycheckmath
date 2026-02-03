// Salary negotiation calculations

export interface NegotiationInput {
  currentOffer: number;
  yearsExperience: number;
  marketRate: number;
  hasCompetingOffer: boolean;
  competingOfferAmount: number;
}

export interface CounterOffer {
  percentage: number;
  amount: number;
  reasoning: string;
  confidence: 'conservative' | 'moderate' | 'aggressive';
}

export interface NegotiationResult {
  counterOffers: CounterOffer[];
  recommendedOffer: CounterOffer;
  lifetimeValue: {
    oneYear: number;
    threeYears: number;
    fiveYears: number;
  };
  negotiationTips: string[];
  scripts: {
    email: string;
    phone: string;
  };
}

export function calculateNegotiation(input: NegotiationInput): NegotiationResult {
  const { currentOffer, yearsExperience, marketRate, hasCompetingOffer, competingOfferAmount } = input;

  // Calculate counter offer percentages based on experience and market
  const experienceMultiplier = Math.min(1 + (yearsExperience * 0.02), 1.2); // Max 20% boost
  const marketGap = marketRate > currentOffer ? (marketRate - currentOffer) / currentOffer : 0;

  // Generate counter offers
  const counterOffers: CounterOffer[] = [
    {
      percentage: 10,
      amount: Math.round(currentOffer * 1.10),
      reasoning: 'Conservative approach - shows you value the opportunity while seeking fair compensation',
      confidence: 'conservative',
    },
    {
      percentage: 15,
      amount: Math.round(currentOffer * 1.15),
      reasoning: 'Moderate approach - balances ambition with realism, backed by market data',
      confidence: 'moderate',
    },
    {
      percentage: 20,
      amount: Math.round(currentOffer * 1.20),
      reasoning: 'Aggressive approach - demonstrates high confidence in your value, best with competing offers',
      confidence: 'aggressive',
    },
  ];

  // Adjust for market rate
  if (marketGap > 0.15) {
    counterOffers.push({
      percentage: Math.round(marketGap * 100),
      amount: marketRate,
      reasoning: 'Market-aligned approach - matches industry standard for your role and experience',
      confidence: 'moderate',
    });
  }

  // Adjust for competing offer
  if (hasCompetingOffer && competingOfferAmount > currentOffer) {
    const competingGap = (competingOfferAmount - currentOffer) / currentOffer;
    counterOffers.push({
      percentage: Math.round(competingGap * 100),
      amount: competingOfferAmount,
      reasoning: 'Competing offer approach - leverages alternative offer to match or exceed',
      confidence: 'aggressive',
    });
  }

  // Determine recommended offer
  let recommendedOffer = counterOffers[1]; // Default to moderate
  if (hasCompetingOffer && competingOfferAmount > currentOffer * 1.15) {
    recommendedOffer = counterOffers.find(o => o.amount === competingOfferAmount) || counterOffers[2];
  } else if (marketGap > 0.1) {
    recommendedOffer = counterOffers.find(o => o.amount === marketRate) || counterOffers[1];
  } else if (yearsExperience < 2) {
    recommendedOffer = counterOffers[0]; // Conservative for early career
  }

  // Calculate lifetime value
  const recommendedAmount = recommendedOffer.amount;
  const lifetimeValue = {
    oneYear: recommendedAmount - currentOffer,
    threeYears: (recommendedAmount - currentOffer) * 3,
    fiveYears: (recommendedAmount - currentOffer) * 5,
  };

  // Generate negotiation tips
  const negotiationTips = [
    'Research industry standards and have data ready to support your request',
    'Focus on your value and accomplishments, not personal financial needs',
    'Be confident but flexible - show willingness to discuss the entire package',
    'Consider total compensation: salary, bonus, equity, benefits, PTO',
    'Practice your pitch beforehand with a friend or mentor',
    'Get the offer in writing before negotiating',
    'Be prepared to walk away if the offer doesn\'t meet your minimum',
    'Negotiate via email first to have time to craft thoughtful responses',
  ];

  // Add experience-specific tips
  if (yearsExperience < 2) {
    negotiationTips.push('As an early-career professional, emphasize your potential and eagerness to learn');
  } else if (yearsExperience >= 5) {
    negotiationTips.push('Leverage your extensive experience and proven track record');
  }

  if (hasCompetingOffer) {
    negotiationTips.push('Mention your competing offer professionally - it\'s your strongest leverage');
  }

  if (marketGap > 0.1) {
    negotiationTips.push('The current offer is below market rate - use salary data to justify your counter');
  }

  // Generate scripts
  const scripts = {
    email: generateEmailScript(currentOffer, recommendedOffer, hasCompetingOffer, marketRate),
    phone: generatePhoneScript(currentOffer, recommendedOffer, hasCompetingOffer),
  };

  return {
    counterOffers: counterOffers.sort((a, b) => a.amount - b.amount),
    recommendedOffer,
    lifetimeValue,
    negotiationTips,
    scripts,
  };
}

function generateEmailScript(
  currentOffer: number,
  recommendedOffer: CounterOffer,
  hasCompetingOffer: boolean,
  marketRate: number
): string {
  const offerAmount = formatCurrency(currentOffer);
  const counterAmount = formatCurrency(recommendedOffer.amount);

  return `Subject: Re: Job Offer - [Your Name]

Dear [Hiring Manager Name],

Thank you for extending the offer for the [Position Title] role. I'm very excited about the opportunity to join [Company Name] and contribute to [specific project/team/goal].

After careful consideration and research into market rates for this position, I would like to discuss the compensation package. Based on my [X years] of experience in [your field], my track record of [specific accomplishments], and current market data, I believe a salary of ${counterAmount} would be more aligned with the value I can bring to the role.

${hasCompetingOffer ? 'I should mention that I have received another offer, but [Company Name] remains my top choice due to [specific reasons - culture, mission, growth opportunity].\n\n' : ''}${marketRate > currentOffer ? `Industry research shows that the median salary for this role with my experience level is around ${formatCurrency(marketRate)}.\n\n` : ''}I'm confident that I can deliver exceptional results and would love to find a compensation package that reflects the value I'll bring to the team. I'm also open to discussing other aspects of the offer, such as signing bonus, equity, or additional benefits.

I'm very enthusiastic about this opportunity and hope we can reach an agreement that works for both of us.

Thank you for your consideration.

Best regards,
[Your Name]`;
}

function generatePhoneScript(
  currentOffer: number,
  recommendedOffer: CounterOffer,
  hasCompetingOffer: boolean
): string {
  const offerAmount = formatCurrency(currentOffer);
  const counterAmount = formatCurrency(recommendedOffer.amount);

  return `Opening:
"Thank you so much for the offer. I'm really excited about the opportunity to join the team and contribute to [specific goal/project]."

Transition:
"I've given the offer careful thought, and I'd like to discuss the compensation if that's okay."

Counter Offer:
"Based on my [X years] of experience, my track record with [specific accomplishments], and my research into market rates, I was hoping we could discuss a salary closer to ${counterAmount}."

${hasCompetingOffer ? `Leverage (if needed):
"I should mention that I do have another offer on the table, but your company is my top choice because [specific reasons]. I'm hoping we can find a number that works for both of us."\n\n` : ''}Flexibility:
"I'm also open to discussing other aspects of the package - whether that's a signing bonus, additional equity, or other benefits. My main goal is to ensure the total package reflects the value I'll bring to the role."

Closing:
"I'm very enthusiastic about this opportunity and confident I can deliver great results. What are your thoughts on this?"

Remember:
- Pause after stating your counter - let them respond
- Be friendly and collaborative, not confrontational
- If they can't meet your number, ask "What can you do?"
- Be prepared to negotiate on other benefits if salary is fixed`;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper to calculate annual raise impact
export function calculateRaiseImpact(currentSalary: number, raisePercentage: number, years: number): number {
  let salary = currentSalary;
  for (let i = 0; i < years; i++) {
    salary *= (1 + raisePercentage / 100);
  }
  return Math.round(salary);
}

// Helper to compare two offers over time
export function compareOffersOverTime(offer1: number, offer2: number, years: number): {
  year: number;
  offer1Total: number;
  offer2Total: number;
  difference: number;
}[] {
  const results = [];
  for (let year = 1; year <= years; year++) {
    const offer1Total = offer1 * year;
    const offer2Total = offer2 * year;
    results.push({
      year,
      offer1Total,
      offer2Total,
      difference: offer2Total - offer1Total,
    });
  }
  return results;
}
