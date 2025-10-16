import React from "react";
// import Navigation from "./components/Navigation";
import { 
  Users, 
  Search, 
  Plus, 
  Heart,
  MessageSquare,
  Share2,
  Award,
  Leaf,
  TrendingUp,
  HelpCircle
} from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Best fertilizer combination for wheat in winter season?",
    author: "Rajesh Kumar",
    avatar: "/placeholder.svg",
    expertise: "Wheat Specialist",
    timeAgo: "2 hours ago",
    category: "Crop Management",
    replies: 12,
    likes: 25,
    tags: ["wheat", "fertilizer", "winter"],
    excerpt: "I've been experimenting with different NPK combinations and want to share my findings..."
  },
  {
    id: 2,
    title: "Organic pest control methods that actually work",
    author: "Priya Sharma",
    avatar: "/placeholder.svg", 
    expertise: "Organic Farming Expert",
    timeAgo: "5 hours ago",
    category: "Pest Management",
    replies: 18,
    likes: 42,
    tags: ["organic", "pest-control", "sustainable"],
    excerpt: "After 10 years of organic farming, here are the most effective natural pest control methods..."
  },
  {
    id: 3,
    title: "Water conservation techniques for drought-prone areas",
    author: "Mohammed Ali",
    avatar: "/placeholder.svg",
    expertise: "Water Management",
    timeAgo: "1 day ago", 
    category: "Irrigation",
    replies: 8,
    likes: 31,
    tags: ["water-conservation", "drought", "irrigation"],
    excerpt: "Sharing some innovative drip irrigation setups that have reduced my water usage by 40%..."
  }
];

const expertAnswers = [
  {
    id: 1,
    question: "When to apply second dose of urea for rice?",
    expert: "Dr. Anjali Patel",
    title: "Agricultural Extension Officer",
    answer: "Apply the second dose of urea 3-4 weeks after transplanting, during the tillering stage...",
    timeAgo: "3 hours ago",
    upvotes: 156
  },
  {
    id: 2,
    question: "Dealing with yellow leaf curl virus in tomatoes",
    expert: "Prof. Suresh Reddy", 
    title: "Plant Pathologist",
    answer: "Yellow leaf curl virus is primarily transmitted by whiteflies. Focus on vector control...",
    timeAgo: "6 hours ago",
    upvotes: 89
  }
];

const topContributors = [
  { name: "Rajesh Kumar", contributions: 245, expertise: "Wheat & Rice", badge: "Gold" },
  { name: "Dr. Anjali Patel", contributions: 189, expertise: "Crop Protection", badge: "Gold" },
  { name: "Priya Sharma", contributions: 167, expertise: "Organic Farming", badge: "Silver" },
  { name: "Mohammed Ali", contributions: 134, expertise: "Water Management", badge: "Silver" }
];

export default function Community() {

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#fefcf0]">
      {/* <Navigation /> */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-green-500 rounded-full px-6 py-3 mb-4">
            <Users className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Farming Community</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discuss farming topics and get expert advice</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full border rounded-md pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            Start Discussion
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
              <button className="flex-1 bg-white text-gray-900 font-medium py-2 px-4 rounded-md text-sm">Recent Discussions</button>
              <button className="flex-1 text-gray-500 font-medium py-2 px-4 rounded-md text-sm hover:bg-gray-100">Expert Answers</button>
              <button className="flex-1 text-gray-500 font-medium py-2 px-4 rounded-md text-sm hover:bg-gray-100">My Posts</button>
            </div>

            {/* Discussions */}
            {discussions.map(d => (
              <div key={d.id} className="bg-white p-4 rounded-md shadow hover:shadow-md transition">
                <div className="flex items-start space-x-4 mb-3">
                  <img src={d.avatar} alt={d.author} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{d.author}</span>
                      <span className="text-xs bg-gray-200 px-2 rounded">{d.expertise}</span>
                    </div>
                    <p className="text-xs text-gray-500">{d.timeAgo}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 rounded">{d.category}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
                <p className="text-gray-600 mb-2">{d.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {d.tags.map((tag, i) => <span key={i} className="text-xs bg-green-100 px-2 rounded">#{tag}</span>)}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center space-x-1"><Heart className="w-4 h-4" /> <span>{d.likes}</span></div>
                    <div className="flex items-center space-x-1"><MessageSquare className="w-4 h-4" /> <span>{d.replies}</span></div>
                    <div className="flex items-center space-x-1"><Share2 className="w-4 h-4" /> <span>Share</span></div>
                  </div>
                  <button className="border px-2 py-1 rounded text-sm">Join</button>
                </div>
              </div>
            ))}

            {/* Expert Answers */}
            <div>
              <div className="flex items-center mb-2"><Award className="w-5 h-5 text-yellow-500 mr-2" /><span className="font-semibold text-lg">Expert Answers</span></div>
              {expertAnswers.map(a => (
                <div key={a.id} className="bg-white p-4 rounded-md shadow mb-3">
                  <div className="flex items-center space-x-2 mb-2"><HelpCircle className="w-4 h-4 text-green-500" /><span className="font-medium">{a.question}</span></div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">{a.expert.split(' ').map(n => n[0]).join('')}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{a.expert}</span>
                        <span className="text-xs bg-gray-200 px-2 rounded">{a.title}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{a.answer}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{a.timeAgo}</span>
                        <div className="flex items-center space-x-1"><TrendingUp className="w-3 h-3 text-green-600" /><span>{a.upvotes} upvotes</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white p-4 rounded-md shadow space-y-2">
              <h4 className="font-semibold mb-2">Community Stats</h4>
              <div className="flex justify-between text-sm text-gray-600"><span>Active Members</span><span>12,847</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Discussions Today</span><span>47</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Expert Answers</span><span>156</span></div>
              <div className="flex justify-between text-sm text-gray-600"><span>Success Stories</span><span>23</span></div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white p-4 rounded-md shadow space-y-3">
              <div className="flex items-center mb-2"><Award className="w-4 h-4 text-yellow-500 mr-2" />Top Contributors</div>
              {topContributors.map((c,i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">{c.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.expertise}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(c.badge)}`}>{c.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
