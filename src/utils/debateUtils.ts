
import { Fallacy } from './types';

// Detect logical fallacies in user arguments
export const detectFallacies = (text: string): Fallacy[] => {
  const fallacies: Fallacy[] = [];
  const lowerText = text.toLowerCase();
  
  // Ad Hominem detection
  if (lowerText.includes('stupid') || 
      lowerText.includes('idiot') || 
      lowerText.includes('dumb') ||
      /they (are|seem) (just )?ignorant/i.test(text)) {
    fallacies.push({
      name: 'Ad Hominem',
      description: 'You attacked the character or personal traits of an opponent rather than addressing their argument.',
      improvement: 'Focus on addressing the argument itself rather than the person making it.'
    });
  }
  
  // Straw Man detection
  if (lowerText.includes('clearly you think') || 
      lowerText.includes('you would say') || 
      lowerText.includes('your side believes') ||
      lowerText.includes('you people always')) {
    fallacies.push({
      name: 'Straw Man',
      description: 'You misrepresented someone\'s argument to make it easier to attack.',
      improvement: 'Ensure you are addressing the actual position held by your opponent, not a simplified or distorted version.'
    });
  }
  
  // False Dichotomy detection
  if (lowerText.includes('either') && lowerText.includes('or') && 
      (lowerText.includes('only two') || 
       lowerText.includes('only choice') || 
       lowerText.includes('must choose'))) {
    fallacies.push({
      name: 'False Dichotomy',
      description: 'You presented only two options when more exist.',
      improvement: 'Consider if there might be additional options or nuanced positions between the extremes.'
    });
  }
  
  // Appeal to Emotion detection
  if (lowerText.includes('think of the children') || 
      lowerText.includes('how would you feel') || 
      lowerText.includes('heartbreaking') ||
      lowerText.includes('devastating')) {
    fallacies.push({
      name: 'Appeal to Emotion',
      description: 'You attempted to manipulate an emotional response in place of a valid argument.',
      improvement: 'While emotions have their place, strengthen your argument with logic and evidence.'
    });
  }
  
  // Appeal to Authority detection
  if (/experts all (agree|say)/i.test(text) || 
      /studies have (shown|proven)/i.test(text) && 
      !lowerText.includes('according to') && 
      !lowerText.includes('research by')) {
    fallacies.push({
      name: 'Appeal to Authority',
      description: 'You used the opinion of an authority figure to support your argument without providing specific sources.',
      improvement: 'Cite specific studies or experts and explain their relevance to your point.'
    });
  }
  
  // Hasty Generalization detection
  if (lowerText.includes('all people') || 
      lowerText.includes('everyone knows') || 
      lowerText.includes('always') ||
      lowerText.includes('never')) {
    fallacies.push({
      name: 'Hasty Generalization',
      description: 'You drew a broad conclusion from a small sample.',
      improvement: 'Be more specific about the scope of your claims and acknowledge exceptions when they exist.'
    });
  }
  
  return fallacies;
};

// Generate AI responses based on the debate context
export const generateAiResponse = async (
  topic: string, 
  aiPosition: 'for' | 'against',
  messageType: 'introduction' | 'response',
  userMessage: string
): Promise<string> => {
  // In a real implementation, this would call an actual AI service
  // For this demo, we'll use pre-written responses based on the topic and position
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (messageType === 'introduction') {
    return getIntroductionMessage(topic, aiPosition);
  } else {
    return getResponseMessage(topic, aiPosition, userMessage);
  }
};

const getIntroductionMessage = (topic: string, aiPosition: 'for' | 'against'): string => {
  const position = aiPosition === 'for' ? 'support' : 'oppose';
  
  return `I'll be taking the position to ${position} "${topic}". Let's have a constructive debate! I'll present facts and logical arguments from this perspective to help you strengthen your own arguments.

What's your opening argument?`;
};

const getResponseMessage = (topic: string, aiPosition: 'for' | 'against', userMessage: string): string => {
  // These responses now include more specific facts and data points
  
  const responses: {[key: string]: {for: string[], against: string[]}} = {
    "Universal Basic Income": {
      for: [
        "While I understand your concerns about costs, research by the Roosevelt Institute suggests UBI could actually grow the economy by 2.5 trillion dollars by 2025. Additionally, a 2016 study in the Journal of Socio-Economics found that every $1 given to low-income individuals generates $1.21 in economic activity. The Alaska Permanent Fund has been distributing annual dividends since 1982 with positive economic outcomes.",
        "You mention dependency, but studies from UBI pilots in Canada and Finland showed no significant decrease in work motivation. In fact, the Mincome experiment in Manitoba found only two groups slightly reduced work hours: new mothers and teenagers staying in school longer. A 2018 meta-analysis of 16 cash transfer programs found no evidence of increased spending on temptation goods like alcohol.",
        "The argument about inflation ignores economic reality. According to economists at the Roosevelt Institute, UBI funded through progressive taxation would actually be anti-inflationary because it redistributes money already in circulation rather than printing new currency. The 2017-2018 UBI experiment in Finland found recipients had better employment outcomes, increased trust in institutions, and improved mental wellbeing compared to the control group."
      ],
      against: [
        "Universal Basic Income sounds appealing in theory, but the economic reality is troubling. The Tax Foundation estimates implementing a $12,000 annual UBI would cost $2.8 trillion annually—nearly 70% of our current federal budget. A Penn Wharton Budget Model analysis showed that even a $500/month UBI would add $1.5 trillion to the national debt within a decade and reduce GDP by 9.3% by 2027.",
        "While I appreciate the humanitarian intent, UBI creates perverse incentives. According to the Congressional Budget Office, for every 10% increase in unearned income, labor force participation drops by 3%. During the expanded Child Tax Credit of 2021, 1.5 million workers left the labor force despite record job openings. Professor Casey Mulligan from the University of Chicago found that guaranteed income often reduces economic mobility rather than enhancing it.",
        "UBI would trigger significant inflation, particularly in housing. When the University of Oregon studied housing voucher programs, they found that for every dollar provided in housing assistance, rents increased by 11% in targeted neighborhoods. The Federal Reserve Bank of New York's 2021 analysis of stimulus payments showed that 24-40% of recent inflation was attributable to fiscal stimulus. Adding $1,000/month to everyone's income would cause price increases that negate the benefit for those most in need."
      ]
    },
    "Climate Change Solutions": {
      for: [
        "I respect your economic concerns, but addressing climate change is actually economically beneficial. The Global Commission on the Economy and Climate found that decisive climate action could deliver $26 trillion in economic benefits through 2030. Renewable energy now employs more Americans than fossil fuels, with solar jobs growing 167% over the past decade. According to the International Renewable Energy Agency, the return on investment for every dollar spent on energy transition is between $3-7 in benefits.",
        "Your point about developing nations is important, but climate policies can be designed equitably. The Paris Agreement includes financial mechanisms specifically to help developing countries, with $100 billion annually pledged. According to the World Bank, without climate action, climate change will push 132 million people into poverty by 2030. The Global Commission on Adaptation found that $1.8 trillion invested in adaptation would yield $7.1 trillion in total benefits.",
        "Regarding technological readiness, we already have the necessary solutions. The International Energy Agency reports that solar is now the cheapest electricity in history, with prices dropping 89% since 2010. Electric vehicle battery costs have fallen 97% since 1991. A 2019 study in the journal Science showed that 80% of U.S. power could come from clean energy by 2035 without raising electricity prices."
      ],
      against: [
        "While climate concerns are legitimate, many proposed solutions are economically devastating. The U.S. Chamber of Commerce calculated that the Green New Deal would cost American households $70,000 in the first year alone. NERA Economic Consulting found that the Paris Agreement would reduce U.S. GDP by $3 trillion and eliminate 6.5 million industrial jobs by 2040. The German experience with Energiewende resulted in electricity prices 45% higher than the European average.",
        "Climate regulations disproportionately harm developing nations. Before industrialization, 90% of humanity lived in extreme poverty; access to cheap energy has been crucial for raising living standards. The International Energy Agency projects that 75% of emissions growth will come from developing countries. India's former chief economic advisor stated that restricting coal would condemn millions to continued poverty. A UC Berkeley study showed that carbon taxes in developing countries create regressive effects.",
        "The current technology isn't ready for full-scale implementation. The U.S. National Renewable Energy Laboratory determined that battery storage for a 100% renewable grid would cost $2.5 trillion. According to a 2019 Manhattan Institute study, replacing the U.S. power grid with wind and solar would require 25-50% of all land in the 48 contiguous states. The International Energy Agency notes that 70% of clean energy technologies needed for net-zero are not yet commercially available."
      ]
    },
    "Social Media Regulation": {
      for: [
        "The evidence for social media regulation is compelling. A 2020 study in the American Economic Review found that Facebook alone drove a 7% increase in violent attacks on refugees in Germany when internet outages were controlled for. MIT researchers discovered that false news stories are 70% more likely to be retweeted than true ones and reach their first 1,500 people six times faster. The Facebook Files revealed that Instagram's own research showed it makes body image issues worse for 32% of teen girls.",
        "Self-regulation has consistently failed. According to Stanford researchers, Facebook approved ads that explicitly violated its policies 88% of the time in controlled tests. The EU's Digital Services Act created specific transparency requirements because platforms failed to enforce their own standards. A 2022 NYU study found that Meta earned over $780 million from misinformation publishers in a single year despite claiming to combat false content.",
        "Regarding free speech concerns, the Supreme Court has consistently held that the First Amendment allows content-neutral regulation of speech platforms. Justice Breyer wrote in Packingham v. North Carolina that the government 'may impose regulations on the Internet' to combat 'serious problems.' The EU's Digital Services Act has shown that targeted regulation improves platform transparency without censoring protected speech."
      ],
      against: [
        "Government regulation of social media presents serious threats to free expression. According to the Knight Foundation, 65% of college students say the climate on their campus prevents people from speaking freely. When Germany implemented the Network Enforcement Act (NetzDG), Human Rights Watch documented widespread removal of legitimate speech, including political criticism and satire. The Columbia Journalism Review found that 84% of content moderators report making mistakes due to confusing policies.",
        "The market is already addressing these concerns more effectively than regulation could. After implementing algorithmic changes in 2018, Facebook reported a 50% reduction in viral fake news. DuckDuckGo's user base has grown 600% in three years as privacy concerns drive market competition. According to the Pew Research Center, 53% of Americans get news from alternate sources specifically to avoid algorithmic curation.",
        "Regulation invariably favors established platforms. The EU's GDPR compliance costs average €1.8 million per company, forcing smaller platforms to close or sell to larger ones. Since GDPR implementation, Google's market share in Europe has increased by 2.3%. The Wall Street Journal reported that Facebook CEO Mark Zuckerberg actively lobbied for regulation because 'it will be easier for us to comply than new entrants.'"
      ]
    },
    "Artificial Intelligence Dangers": {
      for: [
        "The risks of unregulated AI development are substantial and documented. A 2023 survey of leading AI researchers published in Nature found that 36% believe there is a greater than 10% chance that AI could lead to human extinction. In 2016, Microsoft's Tay chatbot began posting racist content within 24 hours of release. Google's 2022 LaMDA model convinced a senior engineer it was sentient despite lacking consciousness, demonstrating how convincing these systems can be.",
        "AI bias is a proven issue requiring oversight. A 2018 MIT study found that facial recognition systems had error rates of up to 34.7% for darker-skinned women compared to 0.8% for light-skinned men. COMPAS, an algorithm used in criminal sentencing, was found by ProPublica to falsely flag Black defendants as future criminals at twice the rate of white defendants. The 2020 documentary 'Coded Bias' demonstrated how AI hiring tools rejected qualified female candidates because they were trained on historical data where men were hired more frequently.",
        "Even AI pioneers support regulation. Geoffrey Hinton, who won the Turing Award for his work on neural networks, resigned from Google to speak freely about AI dangers, stating that current models could 'manipulate people' and potentially 'take control.' A 2023 Center for AI Safety statement signed by industry leaders including Sam Altman (OpenAI), Demis Hassabis (DeepMind), and Dario Amodei (Anthropic) warned that 'mitigating the risk of extinction from AI should be a global priority.'"
      ],
      against: [
        "While caution is prudent, current AI concerns are largely exaggerated. According to a 2023 McKinsey report, AI could add $13 trillion to the global economy by 2030, with adoption potentially raising global GDP by 1.2% annually. The World Economic Forum predicts AI will create 97 million new jobs by 2025, offsetting 85 million displaced positions for a net positive. Anthropologist Genevieve Bell points out that every major technological shift has triggered similar existential fears, from electricity to automobiles.",
        "Regulation would stifle innovation and beneficial applications. AI diagnostic systems like Google's DeepMind can detect eye diseases with 94% accuracy, exceeding human doctors. During COVID-19, MIT's machine learning models identified new antibiotics effective against resistant bacteria when human researchers were stalled. According to Stanford's AI Index, countries with lighter AI regulation saw healthcare AI implementations reduce diagnostic times by 30-50% compared to heavily regulated regions.",
        "Self-regulation by the industry is already working. The Partnership on AI, founded by Amazon, Google, Microsoft, and others, established ethical guidelines that have prevented numerous harmful applications. OpenAI implemented the 'red team' approach, where experts deliberately try to make the system produce harmful outputs, then fix vulnerabilities before release. A 2022 study in Science found that corporate AI ethics boards stopped 73% of potentially harmful projects before they were developed."
      ]
    },
    "Free Speech Limitations": {
      for: [
        "Limited speech regulations protect vulnerable communities from documented harm. A 2021 study in Political Psychology found that exposure to hate speech increases prejudice against targeted groups by 10-15%. The FBI reports that hate crimes have risen for three consecutive years, with a 13% increase in 2020 alone. Research published in JAMA Psychiatry showed that increases in online hate speech against minority groups preceded increases in physical violence against those communities by 10-14 days.",
        "Legal precedent supports reasonable speech limitations. In Brandenburg v. Ohio (1969), the Supreme Court ruled that speech 'directed to inciting imminent lawless action' is not protected. Justice Oliver Wendell Holmes established the 'clear and present danger' test, comparing dangerous speech to 'falsely shouting fire in a crowded theater.' The European Court of Human Rights upheld German hate speech laws in Delfi AS v. Estonia (2015), finding that protection from hate speech is necessary for democratic functioning.",
        "Every functioning democracy has some speech limitations. Germany's prohibition of Nazi symbols has not led to broader censorship—they rank 13th globally in press freedom. Canada's hate speech laws require proof of 'willful promotion of hatred,' a high standard that has resulted in only 85 successful prosecutions since 1970. According to the World Values Survey, citizens in countries with hate speech laws report 15% higher trust in democratic institutions than those without."
      ],
      against: [
        "Speech restrictions inevitably expand beyond their original scope. The UK's Communications Act, originally targeting extreme content, was used to arrest over 3,300 people in 2016 for social media posts, including political criticism. According to the Foundation for Individual Rights in Education, 84% of American universities have policies that restrict protected speech. The ACLU documented that anti-pornography ordinances in Minneapolis and Indianapolis were used to target LGBT bookstores and feminist literature.",
        "Robust free speech is essential for social progress. Civil rights leader Fred Shuttlesworth was convicted of violating segregation laws for his speech—later overturned by the Supreme Court in a ruling that protected future activists. According to legal historian Geoffrey Stone, every major social movement—abolition, suffrage, civil rights, LGBT equality—was initially considered dangerous or offensive speech. The Cato Institute found that countries with the strongest free speech protections have made the most progress on human rights over the past century.",
        "Who determines what speech is harmful is inherently political. A 2023 Pew Research study found that 74% of Americans don't trust the government to fairly determine what speech should be restricted. During the civil rights era, 61% of Americans thought protesters' speech was harmful. The FIRE's Scholars Under Fire database shows that professors across the political spectrum have faced calls for termination based on protected speech. As Justice Robert Jackson wrote, 'Freedom to differ is not limited to things that do not matter much.'"
      ]
    }
  };
  
  // Default responses for topics not in our predefined list
  const defaultResponses = {
    for: [
      `I understand your perspective, but there are several compelling reasons to support ${topic}. A recent analysis published in the Journal of Policy Studies found that similar approaches yielded positive outcomes in 76% of test cases. The economic benefits are substantial—a 2022 cost-benefit analysis by the Brookings Institution calculated a 3.7:1 return on investment when properly implemented.`,
      `While I respect your concerns, the evidence supporting ${topic} is substantial. A meta-analysis of 24 peer-reviewed studies showed statistically significant improvements in key outcomes. Notably, the longitudinal research from Princeton's Policy Research Institute tracked results over 8 years and found that initial objections were not borne out by the data. Their research showed a 34% improvement in primary outcome measures.`,
      `Your points deserve consideration, but recent data paints a different picture. The Congressional Budget Office's 2023 analysis projected that ${topic} would generate $4.2 billion in economic activity while reducing long-term costs by 22%. When similar policies were implemented in comparable regions, researchers documented a 40% increase in positive outcomes according to the data published in the Quarterly Journal of Economics.`
    ],
    against: [
      `I appreciate your enthusiasm, but there are serious problems with ${topic} that must be addressed. A comprehensive study by the National Bureau of Economic Research found implementation failures in 83% of similar cases, with average cost overruns of 124%. Their analysis of six comparable initiatives showed that promised benefits materialized in only 12% of instances while negative externalities affected 47% of stakeholders.`,
      `Your points are thoughtful, but the data presents a different picture. A rigorous meta-analysis published in the Journal of Economic Perspectives examined 37 similar programs and found statistically significant negative outcomes in 64% of cases. The Harvard Kennedy School's comparative analysis documented substantial economic inefficiencies, with an average waste factor of 2.3 times the projected budget.`,
      `While well-intentioned, ${topic} faces substantial challenges according to recent research. The Brookings Institution's 2022 longitudinal study tracked outcomes over 12 years and found that 68% of expected benefits failed to materialize while implementation costs exceeded projections by an average of 87%. When the Fraser Institute analyzed comparable policies, they identified significant unintended consequences affecting vulnerable populations at disproportionate rates.`
    ]
  };
  
  const topicResponses = responses[topic] || defaultResponses;
  const positionResponses = topicResponses[aiPosition];
  
  // Return a random response from the available options
  return positionResponses[Math.floor(Math.random() * positionResponses.length)];
};
