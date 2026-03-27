import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Bell, ChevronDown, User, AlertTriangle, TrendingUp, TrendingDown, X,
  Wallet, BarChart3, BrainCircuit, LineChart as LineChartIcon, Package,
  Boxes, DollarSign, Receipt, Users, Search, ClipboardList, LayoutGrid,
  CircleDollarSign, Briefcase, Mail, PackageCheck, PackageMinus, Undo2,
  Trash2, Plus, Minus, Star, Store, Truck, MapPin, ExternalLink, ArrowLeft, Sparkles,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine, Area, AreaChart,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";

/* ── DATA ──────────────────────────────────────────────────────── */
const salesData = [
  {name:"Jan",value:3000},{name:"Feb",value:4000},{name:"Mar",value:3500},
  {name:"Apr",value:5000},{name:"May",value:4500},{name:"Jun",value:6000},
  {name:"Jul",value:7000},{name:"Aug",value:6500},{name:"Sep",value:8000},
  {name:"Oct",value:4000},{name:"Nov",value:9000},{name:"Dec",value:10000},
];
const profitData = [
  {name:"Jan",value:2000},{name:"Feb",value:3000},{name:"Mar",value:2500},
  {name:"Apr",value:4000},{name:"May",value:5500},{name:"Jun",value:7000},
  {name:"Jul",value:8500},
];
const pieData = [
  {name:"Nike Jacket",value:14.6},{name:"Binatog",value:22.8},
  {name:"Taho",value:13.7},{name:"Iphone 15",value:30.6},
  {name:"Wireless Headset",value:18.3},
];
const PIE_COLORS = ["#34d399","#10b981","#059669","#047857","#6ee7b7"];

// Predict Sales data
const historicalVsPredicted = [
  {name:"Aug",actual:6500,predicted:null},
  {name:"Sep",actual:8000,predicted:null},
  {name:"Oct",actual:4000,predicted:null},
  {name:"Nov",actual:9000,predicted:null},
  {name:"Dec",actual:10000,predicted:null},
  {name:"Jan",actual:null,predicted:10800},
  {name:"Feb",actual:null,predicted:11500},
  {name:"Mar",actual:null,predicted:12200},
];
const weeklyForecast = [
  {day:"Mon",sales:9200},{day:"Tue",sales:9800},{day:"Wed",sales:10400},
  {day:"Thu",sales:9600},{day:"Fri",sales:11200},{day:"Sat",sales:13500},{day:"Sun",sales:12800},
];

// Demand Forecasting data
const ALL_PRODUCTS = [
  {id:1,name:"Coca-Cola 1.5L",      cat:"Food & Beverages", prev:320, predicted:400, trend:[210,240,280,300,320,360,400], change:25.0, rank:1},
  {id:2,name:"Iphone 15",           cat:"Electronics",      prev:45,  predicted:58,  trend:[30,33,36,40,43,45,58],        change:28.9, rank:2},
  {id:3,name:"Nike Jacket",         cat:"Clothing",         prev:80,  predicted:96,  trend:[60,65,70,74,78,80,96],        change:20.0, rank:3},
  {id:4,name:"Wireless Headphones", cat:"Electronics",      prev:60,  predicted:72,  trend:[40,45,50,54,58,60,72],        change:20.0, rank:4},
  {id:5,name:"Running Shoes",       cat:"Shoes",            prev:110, predicted:128, trend:[80,85,92,98,104,110,128],     change:16.4, rank:5},
  {id:6,name:"Binatog",             cat:"Food & Beverages", prev:200, predicted:228, trend:[140,155,168,178,188,200,228], change:14.0, rank:6},
  {id:7,name:"Taho",                cat:"Food & Beverages", prev:180, predicted:198, trend:[130,140,152,160,170,180,198], change:10.0, rank:7},
  {id:8,name:"T-Shirts",            cat:"Clothing",         prev:95,  predicted:104, trend:[70,74,79,84,89,95,104],      change:9.5,  rank:8},
  {id:9,name:"PS5",                 cat:"Electronics",      prev:22,  predicted:24,  trend:[15,16,17,19,20,22,24],       change:9.1,  rank:9},
  {id:10,name:"Adidas Shirt",       cat:"Clothing",         prev:65,  predicted:70,  trend:[48,51,55,58,62,65,70],       change:7.7,  rank:10},
];
const DEMAND_TREND_WEEKS = ["W1","W2","W3","W4","W5","W6","W7(P)"];
const CATS = ["All","Electronics","Food & Beverages","Clothing","Shoes"];

// Inventory Planning data
const INV_PRODUCTS = [
  {id:1,  name:"Coca-Cola 1.5L",      cat:"Food & Beverages", stock:18,  demand:400, restock:500,  urgency:"critical", daysLeft:1},
  {id:2,  name:"Iphone 15",           cat:"Electronics",      stock:6,   demand:58,  restock:80,   urgency:"critical", daysLeft:2},
  {id:3,  name:"Adidas Shirt",        cat:"Clothing",         stock:12,  demand:70,  restock:90,   urgency:"critical", daysLeft:3},
  {id:4,  name:"Taho",                cat:"Food & Beverages", stock:25,  demand:198, restock:250,  urgency:"high",     daysLeft:4},
  {id:5,  name:"Binatog",             cat:"Food & Beverages", stock:40,  demand:228, restock:280,  urgency:"high",     daysLeft:5},
  {id:6,  name:"Nike Jacket",         cat:"Clothing",         stock:22,  demand:96,  restock:120,  urgency:"high",     daysLeft:6},
  {id:7,  name:"Wireless Headphones", cat:"Electronics",      stock:20,  demand:72,  restock:100,  urgency:"medium",   daysLeft:9},
  {id:8,  name:"Running Shoes",       cat:"Shoes",            stock:50,  demand:128, restock:160,  urgency:"medium",   daysLeft:12},
  {id:9,  name:"T-Shirts",            cat:"Clothing",         stock:25,  demand:104, restock:130,  urgency:"low",      daysLeft:18},
  {id:10, name:"PS5",                 cat:"Electronics",      stock:8,   demand:24,  restock:30,   urgency:"low",      daysLeft:20},
];

// Profit Forecast data
const PROFIT_HISTORY = [
  {month:"Jul", revenue:280000, expenses:190000, profit:90000,  predicted:false},
  {month:"Aug", revenue:305000, expenses:198000, profit:107000, predicted:false},
  {month:"Sep", revenue:340000, expenses:205000, profit:135000, predicted:false},
  {month:"Oct", revenue:290000, expenses:215000, profit:75000,  predicted:false},
  {month:"Nov", revenue:410000, expenses:220000, profit:190000, predicted:false},
  {month:"Dec", revenue:450067, expenses:282066, profit:168001, predicted:false},
  {month:"Jan",  revenue:490000, expenses:295000, profit:195000, predicted:true},
  {month:"Feb",  revenue:525000, expenses:305000, profit:220000, predicted:true},
  {month:"Mar",  revenue:560000, expenses:315000, profit:245000, predicted:true},
];
const PROFIT_TREND = [
  {month:"Jul", profit:90000,  predicted:false},
  {month:"Aug", profit:107000, predicted:false},
  {month:"Sep", profit:135000, predicted:false},
  {month:"Oct", profit:75000,  predicted:false},
  {month:"Nov", profit:190000, predicted:false},
  {month:"Dec", profit:168001, predicted:false},
  {month:"Jan",  actual:null,  predicted:195000},
  {month:"Feb",  actual:null,  predicted:220000},
  {month:"Mar",  actual:null,  predicted:245000},
];

// Expense Prediction data
const EXP_CATEGORIES = [
  {key:"rent",      label:"Rent",               color:"#818cf8", light:"rgba(129,140,248,0.12)", border:"rgba(129,140,248,0.25)"},
  {key:"salaries",  label:"Salaries",            color:"#38bdf8", light:"rgba(56,189,248,0.12)",  border:"rgba(56,189,248,0.25)"},
  {key:"utilities", label:"Utilities",           color:"#fbbf24", light:"rgba(251,191,36,0.12)",  border:"rgba(251,191,36,0.25)"},
  {key:"supplies",  label:"Supplies",            color:"#34d399", light:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.25)"},
  {key:"other",     label:"Other Operational",   color:"#fb7185", light:"rgba(251,113,133,0.12)", border:"rgba(251,113,133,0.25)"},
];
const EXP_HISTORY = [
  {month:"Aug", rent:45000, salaries:120000, utilities:18500, supplies:22000, other:14500, predicted:false},
  {month:"Sep", rent:45000, salaries:120000, utilities:19200, supplies:23500, other:15200, predicted:false},
  {month:"Oct", rent:45000, salaries:122000, utilities:17800, supplies:21000, other:16800, predicted:false},
  {month:"Nov", rent:45000, salaries:122000, utilities:18900, supplies:24500, other:17200, predicted:false},
  {month:"Dec", rent:45000, salaries:125000, utilities:22000, supplies:28500, other:18566, predicted:false},
  {month:"Jan", rent:45000, salaries:128000, utilities:24200, supplies:29800, other:19200, predicted:true},
  {month:"Feb", rent:45000, salaries:128000, utilities:21500, supplies:27000, other:18500, predicted:true},
  {month:"Mar", rent:45000, salaries:130000, utilities:20800, supplies:26500, other:17800, predicted:true},
];
const EXP_INSIGHTS = [
  {cat:"Utilities",  pct:"+10%", color:"#fbbf24", icon:"⚡",
   text:"Utility expenses may increase by 10% based on seasonal usage patterns and rising energy costs during summer months."},
  {cat:"Salaries",   pct:"+2.4%",color:"#38bdf8", icon:"👥",
   text:"Salary costs are expected to rise slightly due to planned staff expansion in Q1. Budget for one additional hire."},
  {cat:"Supplies",   pct:"+4.6%",color:"#34d399", icon:"📦",
   text:"Supply costs are forecast to increase due to higher predicted demand. Consider bulk purchasing to reduce per-unit cost."},
  {cat:"Other Costs",pct:"+3.3%",color:"#fb7185", icon:"📋",
   text:"Other operational costs show a modest upward trend driven by delivery and logistics fees tied to increased order volume."},
];

// Customer Behavior data
const HOURS = ["12a","1a","2a","3a","4a","5a","6a","7a","8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p","10p","11p"];
const DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
// Heatmap: [day][hour] activity 0–100
const HEATMAP_DAILY: number[][] = [
  [0,0,0,0,0,2,5,18,42,65,72,68,58,62,70,75,78,80,72,55,40,25,10,2],
  [0,0,0,0,0,3,6,20,45,68,74,70,60,64,72,77,80,82,74,58,42,28,12,3],
  [0,0,0,0,0,2,5,17,40,62,70,66,56,60,68,72,75,78,70,52,38,22,8,1],
  [0,0,0,0,0,3,7,22,48,70,76,72,62,66,74,78,82,84,76,60,44,30,14,4],
  [0,0,0,0,0,4,10,28,55,75,80,78,68,72,80,85,88,90,82,66,50,35,18,6],
  [0,0,0,0,2,8,15,35,62,80,88,92,85,90,95,98,96,94,88,78,65,50,30,12],
  [0,0,0,0,1,5,10,25,50,72,82,88,80,85,90,92,90,88,80,70,55,40,22,8],
];
const HEATMAP_WEEKLY: number[][] = HEATMAP_DAILY.map(d=>d.map(v=>Math.min(100,Math.round(v*1.2))));
const HEATMAP_MONTHLY: number[][] = HEATMAP_DAILY.map(d=>d.map(v=>Math.min(100,Math.round(v*1.5))));

const TOP_PRODUCTS_DAILY   = [
  {name:"Coca-Cola 1.5L",  qty:142, color:"#34d399"},{name:"Binatog",      qty:118, color:"#818cf8"},
  {name:"Taho",            qty:104, color:"#38bdf8"},{name:"Snickers Bar", qty:92,  color:"#fbbf24"},
  {name:"Chippy",          qty:85,  color:"#fb7185"},{name:"Iphone 15",    qty:78,  color:"#a78bfa"},
  {name:"T-Shirts",        qty:65,  color:"#34d399"},{name:"Nike Jacket",  qty:58,  color:"#38bdf8"},
];
const TOP_PRODUCTS_WEEKLY  = TOP_PRODUCTS_DAILY.map(p=>({...p,qty:p.qty*7+Math.round(Math.random()*50)}));
const TOP_PRODUCTS_MONTHLY = TOP_PRODUCTS_DAILY.map(p=>({...p,qty:p.qty*30+Math.round(Math.random()*200)}));

const PEAK_HOURS_DAILY   = [{label:"3:00 PM – 5:00 PM",intensity:98},{label:"12:00 PM – 1:00 PM",intensity:85},{label:"7:00 PM – 8:00 PM",intensity:72}];
const PEAK_HOURS_WEEKLY  = [{label:"Saturday 3–5 PM",intensity:98},{label:"Friday 6–8 PM",intensity:88},{label:"Sunday 12–2 PM",intensity:80}];
const PEAK_HOURS_MONTHLY = [{label:"Last weekend of month",intensity:96},{label:"15th of month",intensity:84},{label:"1st of month",intensity:78}];

const BOUGHT_TOGETHER = [
  {a:"Coca-Cola 1.5L",  b:"Chippy",         freq:68, color:"#34d399"},
  {a:"Taho",            b:"Binatog",         freq:54, color:"#a78bfa"},
  {a:"Snickers Bar",    b:"Coca-Cola 1.5L",  freq:49, color:"#fbbf24"},
  {a:"Iphone 15",       b:"Wireless Headset",freq:41, color:"#38bdf8"},
  {a:"Nike Jacket",     b:"Running Shoes",   freq:36, color:"#fb7185"},
];

const LOYAL_CUSTOMERS = [
  {rank:1,name:"Maria Santos",     visits:48, totalSpent:128500, avgOrder:2677, badge:"🥇", tier:"Platinum"},
  {rank:2,name:"Juan dela Cruz",   visits:41, totalSpent:98200,  avgOrder:2395, badge:"🥈", tier:"Gold"},
  {rank:3,name:"Ana Reyes",        visits:37, totalSpent:87400,  avgOrder:2362, badge:"🥉", tier:"Gold"},
  {rank:4,name:"Carlo Mendoza",    visits:32, totalSpent:72100,  avgOrder:2253, badge:"4",  tier:"Silver"},
  {rank:5,name:"Liza Pangilinan",  visits:28, totalSpent:65800,  avgOrder:2350, badge:"5",  tier:"Silver"},
  {rank:6,name:"Ben Torres",       visits:24, totalSpent:51200,  avgOrder:2133, badge:"6",  tier:"Bronze"},
  {rank:7,name:"Rosa Garcia",      visits:19, totalSpent:38900,  avgOrder:2047, badge:"7",  tier:"Bronze"},
];

const CB_INSIGHTS = [
  {icon:"🥤",color:"#34d399",pct:"+72%",title:"Soft Drinks + Snacks Bundle",
   text:"Customers frequently buy soft drinks together with snacks. Consider creating a combo deal for Coca-Cola 1.5L and Chippy to boost basket size."},
  {icon:"⏰",color:"#818cf8",pct:"Peak",title:"Afternoon Rush (3–5 PM)",
   text:"Purchase activity spikes dramatically between 3:00 PM and 5:00 PM daily. Ensure full staff coverage and stock replenishment before this window."},
  {icon:"📱",color:"#38bdf8",pct:"+41%",title:"Electronics Cross-Sell",
   text:"Customers who buy Iphone 15 frequently also purchase Wireless Headset within the same visit. Display them together in-store or online."},
  {icon:"🏆",color:"#fbbf24",pct:"Top 7",title:"Loyalty Program Opportunity",
   text:"Your top 7 loyal customers account for 38% of total revenue. A VIP rewards tier could increase their average order value by an estimated 15%."},
];

/* ── GLOBAL CSS ─────────────────────────────────────────────────── */
/* ── AUTH COMPONENT ───────────────────────────────────────────────── */
const AUTH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Pacifico&display=swap');

  @keyframes authFadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes authSlideLeft{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes authSlideRight{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:translateX(0)}}
  @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
  @keyframes gridMove{0%{background-position:0 0}100%{background-position:60px 60px}}
  @keyframes orbPulse{0%,100%{opacity:0.18;transform:scale(1)}50%{opacity:0.28;transform:scale(1.08)}}
  @keyframes scanLine{0%{top:-4%}100%{top:104%}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(184,142,4,0.3),0 0 60px rgba(184,142,4,0.1)}50%{box-shadow:0 0 40px rgba(184,142,4,0.55),0 0 100px rgba(184,142,4,0.2)}}
  @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes ticker{0%{opacity:0;transform:translateY(8px)}15%{opacity:1;transform:translateY(0)}85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-8px)}}

  .auth-inp{
    width:100%; padding:14px 48px 14px 18px;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:14px; color:#fff; font-size:14px;
    font-family:'Inter',sans-serif; outline:none;
    transition:border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing:border-box;
  }
  .auth-inp:focus{
    border-color:rgba(184,142,4,0.6);
    background:rgba(255,255,255,0.09);
    box-shadow:0 0 0 3px rgba(184,142,4,0.12);
  }
  .auth-inp::placeholder{color:rgba(255,255,255,0.25);}
  .auth-inp-wrap{position:relative;width:100%;}
  .auth-inp-icon{
    position:absolute;right:16px;top:50%;
    transform:translateY(-50%);
    color:rgba(255,255,255,0.25);
    pointer-events:none;
  }
  .auth-submit{
    width:100%; padding:15px;
    background:linear-gradient(135deg,#b8860b,#d4a017,#8b6508);
    border:none; border-radius:14px;
    color:#fff; font-size:15px; font-weight:700;
    cursor:pointer; font-family:'Inter',sans-serif;
    letter-spacing:0.04em;
    transition:all 0.22s;
    position:relative; overflow:hidden;
  }
  .auth-submit::before{
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,0.12),transparent);
    opacity:0;transition:opacity 0.2s;
  }
  .auth-submit:hover::before{opacity:1;}
  .auth-submit:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(184,142,4,0.45);}
  .auth-submit:active{transform:translateY(0);}
  .auth-social{
    width:52px;height:52px;border-radius:14px;
    border:1px solid rgba(255,255,255,0.1);
    background:rgba(255,255,255,0.04);
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.18s;font-size:20px;
  }
  .auth-social:hover{background:rgba(255,255,255,0.09);border-color:rgba(255,255,255,0.2);transform:translateY(-2px);}
  .auth-panel-btn{
    padding:12px 32px;border-radius:12px;font-size:14px;font-weight:600;
    cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.2s;
    border:1.5px solid rgba(255,255,255,0.25);
    background:rgba(255,255,255,0.08);color:#fff;letter-spacing:0.03em;
  }
  .auth-panel-btn:hover{background:rgba(255,255,255,0.16);border-color:rgba(255,255,255,0.4);}
  .auth-checkbox{
    width:17px;height:17px;border-radius:5px;
    border:1.5px solid rgba(255,255,255,0.25);
    background:rgba(255,255,255,0.06);
    cursor:pointer;appearance:none;flex-shrink:0;
    transition:all 0.15s;position:relative;
  }
  .auth-checkbox:checked{background:#b8860b;border-color:#b8860b;}
  .auth-checkbox:checked::after{
    content:'✓';position:absolute;top:50%;left:50%;
    transform:translate(-50%,-50%);color:#fff;font-size:11px;font-weight:700;
  }
`;


/* ── RESPONSIVE HOOK ──────────────────────────────────────────────── */

/* ── GLOBAL TOAST ─────────────────────────────────────────────────── */
// Usage: useToast() returns showToast(msg, type)
type ToastType = "success"|"error"|"info";
const ToastCtx = React.createContext<(msg:string,type?:ToastType)=>void>(()=>{});
const useToast  = () => React.useContext(ToastCtx);

const ToastProvider = ({children}:{children?:React.ReactNode}) => {
  const [toasts, setToasts] = React.useState<{id:number;msg:string;type:ToastType}[]>([]);
  const show = React.useCallback((msg:string, type:ToastType="success") => {
    const id = Date.now();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), 2800);
  },[]);
  const icons:Record<ToastType,string> = {success:"✅",error:"❌",info:"ℹ️"};
  const colors:Record<ToastType,{bg:string;border:string;text:string}> = {
    success:{bg:"rgba(52,211,153,0.12)",  border:"rgba(52,211,153,0.35)",  text:"#6ee7b7"},
    error:  {bg:"rgba(251,113,133,0.12)", border:"rgba(251,113,133,0.35)", text:"#fda4af"},
    info:   {bg:"rgba(56,189,248,0.12)",  border:"rgba(56,189,248,0.35)",  text:"#7dd3fc"},
  };
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {ReactDOM.createPortal(
        <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:99999,display:"flex",flexDirection:"column",gap:10,alignItems:"center",pointerEvents:"none"}}>
          {toasts.map((t,i)=>{
            const c = colors[t.type];
            return (
              <div key={t.id} style={{
                display:"flex",alignItems:"center",gap:10,
                padding:"12px 24px",
                background:c.bg,border:`1px solid ${c.border}`,
                borderRadius:999,backdropFilter:"blur(16px)",
                boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
                animation:"fadeUp 0.25s ease both",
                pointerEvents:"none",
              }}>
                <span style={{fontSize:16}}>{icons[t.type]}</span>
                <span style={{fontSize:13,fontWeight:700,color:c.text,whiteSpace:"nowrap"}}>{t.msg}</span>
              </div>
            );
          })}
        </div>,
        document.body
      )}
    </ToastCtx.Provider>
  );
};

/* ── EMPTY STATE ──────────────────────────────────────────────────── */
const EmptyState = ({q,icon="📦",title,sub}:{q:string;icon?:string;title?:string;sub?:string}) => (
  <tr>
    <td colSpan={99} style={{padding:"52px 24px",textAlign:"center"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        <div style={{fontSize:40,filter:"grayscale(0.3)",animation:"warnBounce 2s ease infinite"}}>{icon}</div>
        <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.5)"}}>
          {title||`No results for "${q}"`}
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.28)"}}>
          {sub||(q?`Try a different search term`:"Nothing here yet")}
        </div>
      </div>
    </td>
  </tr>
);


/* ── BARYALYTICS LOGO COMPONENT ───────────────────────────────────── */
// Faithful to the uploaded logo: golden circle, white B, white baseline bar,
// blue upward arrow line, red upward arrow line
const BaryalyticsLogo = ({size=52}:{size?:number}) => {
  const s = size;
  const cx = s*0.5, cy = s*0.5, r = s*0.46;
  // B text sits left ~20% in, baseline bar is ~60% from top
  // Chart lines rise from bottom-left to top-right like the real logo
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Outer golden circle — matches the logo */}
      <defs>
        <radialGradient id="bLogo_bg" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#c9950a"/>
          <stop offset="50%"  stopColor="#a07208"/>
          <stop offset="100%" stopColor="#3a2600"/>
        </radialGradient>
        <radialGradient id="bLogo_bg2" cx="60%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#3a2600" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#bLogo_bg)"/>
      <circle cx="50" cy="50" r="47" fill="url(#bLogo_bg2)"/>

      {/* White B — large, bold, left-aligned like the real logo */}
      <text x="14" y="68" fill="white" fontSize="56" fontWeight="900"
        fontFamily="Arial Black, Arial, sans-serif" letterSpacing="-2">B</text>

      {/* White horizontal baseline bar — thick, just like the logo */}
      <rect x="14" y="74" width="50" height="6" rx="3" fill="white"/>

      {/* Blue upward trend line with arrowhead — matches logo */}
      <polyline
        points="24,72 34,55 44,60 64,28"
        fill="none" stroke="#38bdf8" strokeWidth="4.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Blue arrowhead */}
      <polygon points="64,28 56,30 62,36" fill="#38bdf8"/>

      {/* Red upward trend line with arrowhead — slightly offset below blue */}
      <polyline
        points="24,72 34,58 44,63 64,33"
        fill="none" stroke="#ef4444" strokeWidth="3.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Red arrowhead */}
      <polygon points="64,33 57,34 62,40" fill="#ef4444"/>
    </svg>
  );
};

const useW = () => {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(()=>{
    const h = ()=>setW(window.innerWidth);
    window.addEventListener("resize",h);
    return ()=>window.removeEventListener("resize",h);
  },[]);
  return w;
};

// Module-level responsive grid helpers (read window width directly)
// Components outside App use these; App uses the reactive isMob versions
const colsW = (desktop:number): string => {
  const w = window.innerWidth;
  if(w <= 600) return desktop >= 3 ? "1fr 1fr" : "1fr";
  if(w <= 900) return desktop >= 4 ? "1fr 1fr" : desktop === 3 ? "1fr 1fr" : "1fr";
  return `repeat(${desktop},1fr)`;
};
const colsSplitW = (a:string, b:string): string => window.innerWidth <= 900 ? "1fr" : `${a} ${b}`;

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0d0d14;font-family:'Inter',sans-serif;color:#e2e8f0;}
  ::-webkit-scrollbar{width:4px;height:4px;}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}

  .card{background:#13131f;border-radius:16px;border:1px solid rgba(255,255,255,0.07);padding:20px;position:relative;overflow:hidden;}
  .card-title{font-size:13px;font-weight:600;color:rgba(255,255,255,0.7);margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;letter-spacing:0.01em;}
  .card-x{background:none;border:none;color:rgba(255,255,255,0.2);cursor:pointer;display:flex;align-items:center;padding:2px;}
  .card-x:hover{color:rgba(255,255,255,0.5);}

  .nav-bar{
    background:rgba(13,13,22,0.75);
    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,0.09);
    border-radius:999px;
    box-shadow:0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset;
  }
  .nav-pill-active{background:#fff;color:#000!important;border-radius:999px;padding:6px 18px;font-weight:700;font-size:13px;border:none;cursor:pointer;font-family:'Inter',sans-serif;letter-spacing:0.01em;}
  .nav-pill{color:rgba(255,255,255,0.45);padding:6px 16px;font-size:13px;font-weight:500;border-radius:999px;cursor:pointer;background:none;border:none;font-family:'Inter',sans-serif;transition:all 0.18s;letter-spacing:0.01em;}
  .nav-pill:hover{color:#fff;background:rgba(255,255,255,0.07);}

  .chip-up{background:rgba(52,211,153,0.15);color:#34d399;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:3px;}
  .chip-down{background:rgba(251,113,133,0.15);color:#fb7185;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:3px;}

  .badge-g{background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.2);color:#6ee7b7;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:600;}
  .badge-r{background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.2);color:#fda4af;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:600;}
  .badge-a{background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.2);color:#fde68a;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:600;}
  .badge-v{background:rgba(129,140,248,0.12);border:1px solid rgba(129,140,248,0.2);color:#c7d2fe;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:600;}

  .alert-row{background:rgba(251,113,133,0.08);border:1px solid rgba(251,113,133,0.18);border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,0.75);cursor:pointer;transition:background 0.15s;margin-bottom:8px;}
  .alert-row:last-child{margin-bottom:0;}
  .alert-row:hover{background:rgba(251,113,133,0.14);}

  .inp{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#e2e8f0;padding:10px 14px;font-size:13px;outline:none;font-family:'Inter',sans-serif;transition:border-color 0.15s;width:100%;}
  .inp:focus{border-color:rgba(52,211,153,0.4);}
  .inp::placeholder{color:rgba(255,255,255,0.2);}
  select.inp option{background:#13131f;}

  .btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:rgba(255,255,255,0.65);padding:8px 16px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;white-space:nowrap;}
  .btn:hover{background:rgba(255,255,255,0.1);color:#fff;}
  .btn-g{background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.25);border-radius:10px;color:#6ee7b7;padding:9px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .btn-g:hover{background:rgba(52,211,153,0.25);}
  .btn-r{background:rgba(251,113,133,0.15);border:1px solid rgba(251,113,133,0.25);border-radius:10px;color:#fda4af;padding:9px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;}

  .tab-wrap{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:999px;padding:3px;display:inline-flex;gap:2px;}
  .tab-on{background:#fff;color:#000;border-radius:999px;padding:5px 14px;font-size:11px;font-weight:700;cursor:pointer;border:none;font-family:'Inter',sans-serif;letter-spacing:0.02em;}
  .tab-off{background:none;border:none;color:rgba(255,255,255,0.4);padding:5px 14px;font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;letter-spacing:0.02em;transition:color 0.15s;}
  .tab-off:hover{color:rgba(255,255,255,0.75);}

  .th{padding:12px 14px;color:rgba(255,255,255,0.35);font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;text-align:center;border-bottom:1px solid rgba(255,255,255,0.05);white-space:nowrap;}
  .td{padding:13px 14px;font-size:13px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);}
  .tr:hover td{background:rgba(255,255,255,0.015);}
  .tr:last-child td{border-bottom:none;}

  .ai-card{background:#161622;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:20px;cursor:pointer;transition:all 0.2s;}
  .ai-card:hover{border-color:rgba(129,140,248,0.35);background:#1a1a2e;transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.3);}

  .bg-tl{position:fixed;top:0;left:0;width:700px;height:700px;background:radial-gradient(ellipse at 0% 0%,rgba(29,78,216,0.11) 0%,transparent 70%);pointer-events:none;z-index:0;}
  .bg-br{position:fixed;bottom:0;right:0;width:700px;height:700px;background:radial-gradient(ellipse at 100% 100%,rgba(5,150,105,0.09) 0%,transparent 70%);pointer-events:none;z-index:0;}

  @keyframes tMove{0%{left:0%}20%{left:25%}25%{left:25%}45%{left:50%}50%{left:50%}70%{left:75%}75%{left:75%}95%{left:100%}100%{left:100%}}
  @keyframes pGrow{0%{width:0%}20%{width:25%}25%{width:25%}45%{width:50%}50%{width:50%}70%{width:75%}75%{width:75%}95%{width:100%}100%{width:100%}}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .fu1{animation:fadeUp 0.4s ease both}
  .fu2{animation:fadeUp 0.4s 0.08s ease both}
  .fu3{animation:fadeUp 0.4s 0.16s ease both}
  .fu4{animation:fadeUp 0.4s 0.24s ease both}
  .fu5{animation:fadeUp 0.4s 0.32s ease both}
  .fu6{animation:fadeUp 0.4s 0.40s ease both}

  @keyframes cellPop{from{transform:scale(0.4);opacity:0}to{transform:scale(1);opacity:1}}
  .hcell{animation:cellPop 0.3s ease both;}

  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  .shimmer-bar{background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 2.5s infinite;}

  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  .pulse{animation:pulse 2s infinite;}

  @keyframes notifSlideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
  @keyframes notifRow{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}
  @keyframes urgentPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}
  @keyframes bellWiggle{0%,100%{transform:rotate(0deg)}15%{transform:rotate(18deg)}30%{transform:rotate(-16deg)}45%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}75%{transform:rotate(4deg)}}
  .bell-new{animation:bellWiggle 0.7s ease both;}

  @keyframes rowSlideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes expiryPulse{0%,100%{box-shadow:0 0 0 0 rgba(251,113,133,0.4)}60%{box-shadow:0 0 0 8px rgba(251,113,133,0)}}
  @keyframes warnBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}}
  @keyframes countUp{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
  @keyframes slideRight{from{width:0}to{width:var(--bar-w,100%)}}
  .row-new{animation:rowSlideIn 0.35s ease both;}
  .expiry-warn{animation:expiryPulse 2s ease infinite;}
  .warn-icon{animation:warnBounce 1.8s ease infinite;}
  .count-pop{animation:countUp 0.4s cubic-bezier(0.34,1.56,0.64,1) both;}

  @keyframes formShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
  .form-shake{animation:formShake 0.4s ease both;}
  .inp-err{border-color:rgba(251,113,133,0.7)!important;background:rgba(251,113,133,0.06)!important;box-shadow:0 0 0 3px rgba(251,113,133,0.12)!important;}
  .inp-err:focus{border-color:#fb7185!important;box-shadow:0 0 0 3px rgba(251,113,133,0.2)!important;}
  .lbl-err{color:#fda4af!important;}
  .err-msg{font-size:11px;color:#fda4af;margin-top:5px;display:flex;align-items:center;gap:4px;animation:fadeUp 0.2s ease both;}

  .export-wrap{position:relative;display:inline-flex;}
  .export-btn{display:flex;align-items:center;gap:7px;background:rgba(129,140,248,0.1);border:1px solid rgba(129,140,248,0.22);border-radius:10px;color:#a5b4fc;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.18s;}
  .export-btn:hover{background:rgba(129,140,248,0.2);border-color:rgba(129,140,248,0.38);color:#c7d2fe;}

  .insight-card{
    background:linear-gradient(135deg,rgba(129,140,248,0.1),rgba(167,139,250,0.06));
    border:1px solid rgba(129,140,248,0.2);
    border-radius:14px;
    padding:16px 20px;
    margin-bottom:10px;
    display:flex;
    gap:14px;
    align-items:flex-start;
    transition:border-color 0.15s;
  }
  .insight-card:hover{border-color:rgba(129,140,248,0.35);}
  .insight-card:last-child{margin-bottom:0;}

  .stat-forecast{
    background:#13131f;
    border-radius:14px;
    border:1px solid rgba(255,255,255,0.07);
    padding:20px;
    transition:all 0.2s;
  }
  .stat-forecast:hover{border-color:rgba(129,140,248,0.25);transform:translateY(-2px);}

  /* ── RESPONSIVE HELPERS ── */
  .mob-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .mob-scroll::-webkit-scrollbar{height:3px;}

  /* ── MOBILE NAV ── */
  .mob-drawer{position:fixed;top:0;left:0;bottom:0;width:260px;background:rgba(13,13,22,0.98);backdrop-filter:blur(24px);border-right:1px solid rgba(255,255,255,0.09);z-index:200;transform:translateX(-100%);transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;padding:24px 16px;}
  .mob-drawer.open{transform:translateX(0);}
  .mob-drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:199;display:none;}
  .mob-drawer-overlay.open{display:block;}
  .mob-nav-btn{display:none;width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);cursor:pointer;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);flex-shrink:0;}
  .mob-nav-btn svg{pointer-events:none;}

  @media(max-width:900px){
    /* Show hamburger, hide center nav pills */
    .mob-nav-btn{display:flex;}
    .nav-pills-center{display:none!important;}
    .nav-left-welcome{display:none!important;}

    /* Shrink main padding */
    main{padding-left:16px!important;padding-right:16px!important;}

    /* Floating nav wrapper — reduce side padding */
    .nav-float-wrap{padding:0 12px!important;}

    /* All grids → responsive */
    .grid-5col{grid-template-columns:repeat(2,1fr)!important;}
    .grid-4col{grid-template-columns:repeat(2,1fr)!important;}
    .grid-3col{grid-template-columns:1fr 1fr!important;}
    .grid-2col{grid-template-columns:1fr!important;}
    .grid-split{grid-template-columns:1fr!important;}
    .grid-ai{grid-template-columns:1fr!important;}

    /* Settings layout: sidebar stacks above content */
    .settings-layout{flex-direction:column!important;}
    .settings-sidebar{width:100%!important;position:static!important;}
    .settings-sidebar > div{display:grid;grid-template-columns:repeat(4,1fr);}

    /* Finance heatmap: allow horizontal scroll */
    .heatmap-wrap{overflow-x:auto!important;-webkit-overflow-scrolling:touch;}

    /* Tables: force scroll wrapper */
    .table-scroll{overflow-x:auto!important;-webkit-overflow-scrolling:touch;}
    .th,.td{white-space:nowrap;}

    /* Cards: smaller padding */
    .card{padding:14px!important;}

    /* Stat numbers: smaller on mobile */
    .stat-num{font-size:20px!important;}

    /* Appearance hero banner */
    .appear-hero{padding:20px 16px!important;}
  }

  @media(max-width:600px){
    .grid-5col{grid-template-columns:1fr 1fr!important;}
    .grid-4col{grid-template-columns:1fr 1fr!important;}
    .grid-3col{grid-template-columns:1fr!important;}
    .settings-sidebar > div{grid-template-columns:repeat(2,1fr);}

    /* Reduce chart heights */
    .chart-tall{height:200px!important;}

    /* Nav: tighter */
    .nav-bar{border-radius:14px!important;}

    /* Export button: icon only */
    .export-btn span.export-label{display:none;}
  }

  @media(max-width:400px){
    .grid-5col{grid-template-columns:1fr!important;}
    .grid-4col{grid-template-columns:1fr!important;}
  }
`;

/* ── TOOLTIPS ───────────────────────────────────────────────────── */
const CT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"8px 12px",fontSize:12}}>
      <div style={{color:"rgba(255,255,255,0.45)",marginBottom:2}}>{label}</div>
      <div style={{color:"#34d399",fontWeight:700}}>₱{payload[0].value?.toLocaleString()}</div>
    </div>
  );
};

const MultiCT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
      <div style={{color:"rgba(255,255,255,0.45)",marginBottom:6,fontWeight:600}}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:p.color}}/>
          <span style={{color:"rgba(255,255,255,0.6)",textTransform:"capitalize"}}>{p.name}:</span>
          <span style={{color:"#fff",fontWeight:700}}>₱{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

/* ── PREDICT SALES PAGE ─────────────────────────────────────────── */
const PredictSales = ({ onBack }: { onBack: () => void }) => {
  const [rangeTab, setRangeTab] = useState("7 Days");

  const comparisonData = [
    {month:"Aug",previous:6500,predicted:6800},
    {month:"Sep",previous:8000,predicted:8200},
    {month:"Oct",previous:4000,predicted:4300},
    {month:"Nov",previous:9000,predicted:9400},
    {month:"Dec",previous:10000,predicted:10800},
    {month:"Jan",previous:null,predicted:11500},
    {month:"Feb",previous:null,predicted:12200},
  ];

  const insights = [
    {text:"Sales are expected to increase by 8% next week based on upward momentum in recent months.", pct:"+8%", color:"#34d399"},
    {text:"Weekend sales (Sat–Sun) consistently outperform weekdays by 25–35%. Prepare additional stock.", pct:"+30%", color:"#818cf8"},
    {text:"December historically peaks — January may see a 10% correction before recovery in February.", pct:"-10%", color:"#fb7185"},
    {text:"Monthly sales trajectory shows consistent growth of ₱1,000–₱1,500 per month on average.", pct:"+12%", color:"#fbbf24"},
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      {/* Header */}
      <div className="fu1" style={{display:"flex",alignItems:"center",gap:16}}>
        <button onClick={onBack} className="btn" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
          <ArrowLeft size={15}/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(129,140,248,0.15)",border:"1px solid rgba(129,140,248,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <LineChartIcon size={20} color="#818cf8"/>
          </div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#fff"}}>Predict Sales</h1>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:2}}>AI-powered sales forecasting based on historical data</p>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:10,padding:"6px 14px"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#34d399"}} className="pulse"/>
          <span style={{fontSize:12,color:"#6ee7b7",fontWeight:600}}>Model: Active</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="fu2 grid-4col" style={{display:"grid",gridTemplateColumns:colsW(4),gap:16}}>
        {[
          {label:"Yesterday's Sales",value:"₱10,000",sub:"Dec 31, 2025",icon:TrendingUp,color:"#34d399",bg:"rgba(52,211,153,0.1)",change:"+5.2%",up:true},
          {label:"Today's Predicted",value:"₱10,800",sub:"Jan 1, 2026",icon:Sparkles,color:"#818cf8",bg:"rgba(129,140,248,0.1)",change:"+8.0%",up:true},
          {label:"Weekly Forecast",value:"₱76,500",sub:"Next 7 days",icon:BarChart3,color:"#38bdf8",bg:"rgba(56,189,248,0.1)",change:"+11.2%",up:true},
          {label:"Monthly Forecast",value:"₱318,000",sub:"January 2026",icon:DollarSign,color:"#fbbf24",bg:"rgba(251,191,36,0.1)",change:"+14.9%",up:true},
        ].map((s,i) => (
          <div key={i} className="stat-forecast">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.icon size={18} color={s.color}/>
              </div>
              <span className={s.up?"chip-up":"chip-down"}>{s.up?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{s.change}</span>
            </div>
            <div style={{fontSize:24,fontWeight:700,color:"#fff",marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="fu3 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1.4fr","1fr"),gap:16}}>
        {/* Past vs Predicted Line Chart */}
        <div className="card">
          <div className="card-title">
            Past Sales vs Predicted Sales
            <div style={{display:"flex",gap:16,fontSize:11}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#10b981",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Actual</span></span>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#818cf8",borderRadius:99,borderTop:"1px dashed #818cf8"}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Predicted</span></span>
            </div>
          </div>
          <div style={{height:240}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalVsPredicted} margin={{top:10,right:10,left:-20,bottom:0}}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${v/1000}k`}/>
                <Tooltip content={<MultiCT/>}/>
                <ReferenceLine x="Jan" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" label={{value:"Forecast →",position:"insideTopRight",fill:"rgba(255,255,255,0.2)",fontSize:10}}/>
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2.5} dot={{fill:"#10b981",r:3,strokeWidth:0}} connectNulls={false}/>
                <Line type="monotone" dataKey="predicted" stroke="#818cf8" strokeWidth={2.5} strokeDasharray="6 3" dot={{fill:"#818cf8",r:3,strokeWidth:0}} connectNulls={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="card">
          <div className="card-title">
            Next 7-Day Daily Forecast
            <span className="badge-g">Next Week</span>
          </div>
          <div style={{height:240}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyForecast} margin={{top:10,right:0,left:-20,bottom:0}}>
                <defs>
                  <linearGradient id="wkG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${v/1000}k`}/>
                <Tooltip content={<CT/>}/>
                <Bar dataKey="sales" fill="url(#wkG)" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comparison Table + AI Insights */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>
        {/* Comparison Table */}
        <div className="card">
          <div className="card-title">Previous vs Predicted Sales Comparison</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr>
                  <th className="th" style={{textAlign:"left"}}>Month</th>
                  <th className="th">Previous</th>
                  <th className="th">Predicted</th>
                  <th className="th">Change</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((r,i) => {
                  const change = r.previous && r.predicted ? ((r.predicted - r.previous) / r.previous * 100).toFixed(1) : null;
                  const isUp = change ? +change > 0 : true;
                  return (
                    <tr key={i} className="tr">
                      <td className="td" style={{textAlign:"left",color:"rgba(255,255,255,0.7)",fontWeight:500}}>{r.month}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.45)"}}>{r.previous ? `₱${r.previous.toLocaleString()}` : <span style={{color:"rgba(255,255,255,0.2)",fontSize:11}}>—</span>}</td>
                      <td className="td" style={{color:"#818cf8",fontWeight:600}}>₱{r.predicted?.toLocaleString()}</td>
                      <td className="td">
                        {change
                          ? <span className={isUp ? "chip-up" : "chip-down"}>{isUp ? <TrendingUp size={9}/> : <TrendingDown size={9}/>}{isUp?"+":""}{change}%</span>
                          : <span style={{fontSize:11,color:"#818cf8",fontWeight:600}}>Forecast</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Sparkles size={15} color="#818cf8"/>
              AI Insights & Trend Analysis
            </div>
          </div>
          <div>
            {insights.map((ins, i) => (
              <div key={i} className="insight-card">
                <div style={{minWidth:42,height:42,borderRadius:10,background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:13,fontWeight:700,color:ins.color}}>{ins.pct}</span>
                </div>
                <p style={{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.6}}>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Forecasts */}
      <div className="fu5 grid-3col" style={{display:"grid",gridTemplateColumns:colsW(3),gap:16}}>
        {[
          {label:"Predicted Sales — Tomorrow",value:"₱10,800",note:"Jan 2, 2026 · Based on Dec 31 trend",color:"#818cf8",bg:"rgba(129,140,248,0.08)",border:"rgba(129,140,248,0.2)"},
          {label:"Predicted Sales — Next 7 Days",value:"₱76,500",note:"Jan 2–8, 2026 · Avg ₱10,928/day",color:"#38bdf8",bg:"rgba(56,189,248,0.08)",border:"rgba(56,189,248,0.2)"},
          {label:"Predicted Sales — Next Month",value:"₱318,000",note:"January 2026 · +14.9% vs December",color:"#34d399",bg:"rgba(52,211,153,0.08)",border:"rgba(52,211,153,0.2)"},
        ].map((s,i) => (
          <div key={i} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:14,padding:"20px 22px"}}>
            <p style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.35)",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:10}}>{s.label}</p>
            <p style={{fontSize:30,fontWeight:700,color:s.color,marginBottom:6}}>{s.value}</p>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── DEMAND FORECASTING PAGE ──────────────────────────────────────── */
const DemandForecasting = ({ onBack }: { onBack: () => void }) => {
  const [catFilter, setCatFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Week");
  const [selectedProduct, setSelectedProduct] = useState(ALL_PRODUCTS[0]);

  const filtered = catFilter === "All" ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.cat === catFilter);

  const barData = filtered.map(p => ({name: p.name.length > 12 ? p.name.slice(0,12)+"…" : p.name, predicted: p.predicted, previous: p.prev}));

  const trendData = DEMAND_TREND_WEEKS.map((w, i) => {
    const obj: any = {week: w};
    filtered.slice(0,4).forEach(p => { obj[p.name.split(" ")[0]] = p.trend[i]; });
    return obj;
  });

  const trendColors = ["#34d399","#818cf8","#38bdf8","#fbbf24","#fb7185"];

  const topRecs = [
    {product:"Coca-Cola 1.5L",        pct:25, note:"Demand surge expected due to upcoming summer season.",  color:"#34d399"},
    {product:"Iphone 15",             pct:29, note:"New model awareness driving repeat and new buyer demand.", color:"#818cf8"},
    {product:"Nike Jacket",           pct:20, note:"Seasonal fashion trend — cooler months ahead.",           color:"#38bdf8"},
    {product:"Running Shoes",         pct:16, note:"Fitness campaign season boosting athletic wear demand.",    color:"#fbbf24"},
    {product:"Wireless Headphones",   pct:20, note:"Remote work trend sustaining strong electronics demand.",  color:"#a78bfa"},
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ── Header ── */}
      <div className="fu1" style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <button onClick={onBack} className="btn" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
          <ArrowLeft size={15}/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(52,211,153,0.15)",border:"1px solid rgba(52,211,153,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Package size={20} color="#34d399"/>
          </div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#fff"}}>Demand Forecasting</h1>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:2}}>AI-predicted product demand based on historical sales patterns</p>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:10,padding:"6px 14px"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#34d399"}} className="pulse"/>
          <span style={{fontSize:12,color:"#6ee7b7",fontWeight:600}}>Model: Active</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="fu2" style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.04em"}}>CATEGORY</span>
          <div className="tab-wrap">
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} className={catFilter===c?"tab-on":"tab-off"}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:"auto"}}>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.04em"}}>VIEW BY</span>
          <div className="tab-wrap">
            {["Week","Month"].map(t=>(
              <button key={t} onClick={()=>setTimeFilter(t)} className={timeFilter===t?"tab-on":"tab-off"}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI Summary ── */}
      <div className="fu2 grid-4col" style={{display:"grid",gridTemplateColumns:colsW(4),gap:16}}>
        {[
          {label:"Top Demand Product",  value:"Coca-Cola 1.5L", sub:"Predicted 400 units",   color:"#34d399", bg:"rgba(52,211,153,0.1)",  I:Package},
          {label:"Highest Growth",      value:"+28.9%",         sub:"Iphone 15 this week",   color:"#818cf8", bg:"rgba(129,140,248,0.1)", I:TrendingUp},
          {label:"Products Forecasted", value:`${filtered.length}`,sub:`in ${catFilter==="All"?"all categories":catFilter}`, color:"#38bdf8", bg:"rgba(56,189,248,0.1)", I:Boxes},
          {label:"Avg Demand Increase", value:"+16.1%",         sub:"Across all products",   color:"#fbbf24", bg:"rgba(251,191,36,0.1)",  I:BarChart3},
        ].map((s,i)=>(
          <div key={i} className="stat-forecast">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.I size={18} color={s.color}/>
              </div>
              <span className="chip-up"><TrendingUp size={10}/> High</span>
            </div>
            <div style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="fu3 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1.3fr","1fr"),gap:16}}>

        {/* Bar chart — predicted demand per product */}
        <div className="card">
          <div className="card-title">
            Predicted Demand by Product
            <div style={{display:"flex",gap:14,fontSize:11}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#34d399",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Predicted</span></span>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"rgba(255,255,255,0.2)",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Previous</span></span>
            </div>
          </div>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{top:8,right:8,left:-20,bottom:40}} barGap={4}>
                <defs>
                  <linearGradient id="dmG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="pvG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.25)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:10}} angle={-35} textAnchor="end" interval={0}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <Tooltip content={({active,payload,label})=>{
                  if(!active||!payload?.length)return null;
                  return (
                    <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
                      <div style={{color:"rgba(255,255,255,0.5)",marginBottom:6,fontWeight:600}}>{label}</div>
                      {payload.map((p:any)=>(
                        <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:p.color}}/>
                          <span style={{color:"rgba(255,255,255,0.6)",textTransform:"capitalize"}}>{p.name}:</span>
                          <span style={{color:"#fff",fontWeight:700}}>{p.value} units</span>
                        </div>
                      ))}
                    </div>
                  );
                }}/>
                <Bar dataKey="previous"  fill="url(#pvG)" radius={[4,4,0,0]} barSize={14}/>
                <Bar dataKey="predicted" fill="url(#dmG)" radius={[4,4,0,0]} barSize={14}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line chart — demand trend over time */}
        <div className="card">
          <div className="card-title">
            Demand Trend Over Time
            <span className="badge-g">Top 4 Products</span>
          </div>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{top:8,right:8,left:-20,bottom:0}}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <Tooltip content={({active,payload,label})=>{
                  if(!active||!payload?.length)return null;
                  return (
                    <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
                      <div style={{color:"rgba(255,255,255,0.5)",marginBottom:6,fontWeight:600}}>{label}</div>
                      {payload.map((p:any)=>(
                        <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                          <div style={{width:8,height:8,borderRadius:"50%",background:p.color}}/>
                          <span style={{color:"rgba(255,255,255,0.6)"}}>{p.name}:</span>
                          <span style={{color:"#fff",fontWeight:700}}>{p.value} units</span>
                        </div>
                      ))}
                    </div>
                  );
                }}/>
                <ReferenceLine x="W7(P)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" label={{value:"Predicted",position:"insideTopRight",fill:"rgba(255,255,255,0.2)",fontSize:9}}/>
                {filtered.slice(0,4).map((p,i)=>(
                  <Line key={p.id} type="monotone" dataKey={p.name.split(" ")[0]} stroke={trendColors[i]} strokeWidth={2.5}
                    dot={{fill:trendColors[i],r:3,strokeWidth:0}}
                    strokeDasharray={i===0?"none":"none"}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* legend */}
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:10}}>
            {filtered.slice(0,4).map((p,i)=>(
              <span key={p.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"rgba(255,255,255,0.45)"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:trendColors[i]}}/>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top Products Table + AI Recommendations ── */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1.1fr","1fr"),gap:16}}>

        {/* Top Demand Products Table */}
        <div className="card" style={{padding:0}}>
          <div style={{padding:"16px 20px 0"}}>
            <div className="card-title" style={{marginBottom:0}}>Top Predicted High-Demand Products</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr>
                  <th className="th" style={{textAlign:"left",paddingLeft:20}}>#</th>
                  <th className="th" style={{textAlign:"left"}}>Product</th>
                  <th className="th">Category</th>
                  <th className="th">Prev Qty</th>
                  <th className="th">Predicted Qty</th>
                  <th className="th">Trend</th>
                  <th className="th">Change</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p,i)=>{
                  const up = p.change >= 0;
                  return (
                    <tr key={p.id} className="tr" style={{cursor:"pointer"}} onClick={()=>setSelectedProduct(p)}>
                      <td className="td" style={{paddingLeft:20,color:"rgba(255,255,255,0.3)",fontWeight:600,width:36}}>
                        {i===0?<span style={{color:"#fbbf24"}}>①</span>:i===1?<span style={{color:"rgba(255,255,255,0.5)"}}>②</span>:i===2?<span style={{color:"#fb7185"}}>③</span>:i+1}
                      </td>
                      <td className="td" style={{textAlign:"left",color:"#e2e8f0",fontWeight:500}}>{p.name}</td>
                      <td className="td"><span className="badge-a" style={{fontSize:10}}>{p.cat}</span></td>
                      <td className="td" style={{color:"rgba(255,255,255,0.45)"}}>{p.prev}</td>
                      <td className="td" style={{color:"#34d399",fontWeight:700}}>{p.predicted}</td>
                      <td className="td">
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:3}}>
                          {up ? <TrendingUp size={15} color="#34d399"/> : <TrendingDown size={15} color="#fb7185"/>}
                        </div>
                      </td>
                      <td className="td">
                        <span className={up?"chip-up":"chip-down"}>
                          {up?<TrendingUp size={9}/>:<TrendingDown size={9}/>}
                          {up?"+":""}{p.change}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendation Panel */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* Selected product mini card */}
          <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.1),rgba(16,185,129,0.05))",border:"1px solid rgba(52,211,153,0.2)",borderRadius:14,padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:"rgba(52,211,153,0.15)",border:"1px solid rgba(52,211,153,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Package size={16} color="#34d399"/>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{selectedProduct.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{selectedProduct.cat} · Click any row to inspect</div>
              </div>
              <span className="chip-up" style={{marginLeft:"auto"}}><TrendingUp size={10}/>+{selectedProduct.change}%</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:10}}>
              {[
                {l:"Previous",v:selectedProduct.prev+" units",c:"rgba(255,255,255,0.45)"},
                {l:"Predicted",v:selectedProduct.predicted+" units",c:"#34d399"},
                {l:"Growth",v:"+"+selectedProduct.change+"%",c:"#6ee7b7"},
              ].map(s=>(
                <div key={s.l} style={{textAlign:"center"}}>
                  <div style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card" style={{flex:1}}>
            <div className="card-title">
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <Sparkles size={15} color="#34d399"/>
                AI Recommendations
              </div>
            </div>
            <div>
              {topRecs.map((r,i)=>(
                <div key={i} style={{
                  background:`${r.color}0d`,
                  border:`1px solid ${r.color}33`,
                  borderRadius:12,
                  padding:"12px 16px",
                  marginBottom:10,
                  display:"flex",
                  gap:12,
                  alignItems:"flex-start",
                  transition:"all 0.15s",
                  cursor:"default",
                }}>
                  <div style={{minWidth:44,height:44,borderRadius:10,background:`${r.color}18`,border:`1px solid ${r.color}33`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:11,fontWeight:700,color:r.color}}>+{r.pct}%</span>
                    <TrendingUp size={11} color={r.color} style={{marginTop:1}}/>
                  </div>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:3}}>
                      Product <span style={{color:r.color}}>{r.product}</span> may increase in demand by {r.pct}% next {timeFilter==="Week"?"week":"month"}.
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.5}}>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── EXPORT MENU COMPONENT ────────────────────────────────────────── */
const EXPORT_GROUPS = [
  {
    key:"pdf", icon:"📄", label:"PDF", color:"#fb7185",
    items:[
      {icon:"📄",label:"Standard PDF",         sub:"Best for sharing & printing"},
      {icon:"🗜️",label:"Compressed PDF",        sub:"Reduced file size"},
      {icon:"🔐",label:"PDF with Password",     sub:"Encrypted & access-protected"},
      {icon:"📐",label:"PDF Landscape",         sub:"Wide format for tables & charts"},
      {icon:"📑",label:"PDF Multi-sheet",       sub:"All sections in one document"},
    ],
  },
  {
    key:"excel", icon:"📊", label:"Excel", color:"#34d399",
    items:[
      {icon:"📊",label:"Excel (.xlsx)",         sub:"Full formatting & formulas"},
      {icon:"📋",label:"Excel Flat (.xlsx)",    sub:"Simple rows, no formulas"},
      {icon:"📈",label:"Excel with Charts",     sub:"Includes embedded charts"},
    ],
  },
  {
    key:"data", icon:"🗒️", label:"Data", color:"#38bdf8",
    items:[
      {icon:"🗒️",label:"CSV",                   sub:"Universal plain-text format"},
      {icon:"📦",label:"JSON",                  sub:"Raw structured data"},
      {icon:"📝",label:"TSV (Tab-separated)",   sub:"Compatible with most apps"},
    ],
  },
  {
    key:"other", icon:"🖨️", label:"Other", color:"#fbbf24",
    items:[
      {icon:"🖨️",label:"Print Preview",         sub:"Send directly to printer"},
      {icon:"📧",label:"Send via Email",        sub:"Deliver report to inbox"},
      {icon:"📋",label:"Copy to Clipboard",     sub:"Quick paste anywhere"},
    ],
  },
];

const ExportMenu = ({label="Export"}:{label?:string}) => {
  const [open, setOpen]         = useState(false);
  const [expanded, setExpanded] = useState<string|null>(null);
  const close = ()=>{setOpen(false);setExpanded(null);};

  /* Render modal via portal so it always escapes overflow/transform stacking */
  const modal = open ? ReactDOM.createPortal(
    <div
      style={{
        position:"fixed", inset:0, zIndex:9999,
        display:"flex", alignItems:"center", justifyContent:"center",
        background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)",
      }}
      onMouseDown={close}
    >
      <div
        style={{
          background:"#14142a",
          border:"1px solid rgba(129,140,248,0.3)",
          borderRadius:20, width:420, maxWidth:"94vw",
          boxShadow:"0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
          overflow:"hidden",
          animation:"fadeUp 0.18s ease both",
        }}
        onMouseDown={e=>e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:3}}>Export as</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>Choose a format — expand a group to see options</div>
          </div>
          <button
            onMouseDown={e=>{e.stopPropagation();close();}}
            style={{width:30,height:30,borderRadius:8,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.5)",fontSize:16,lineHeight:1}}
          >✕</button>
        </div>

        {/* ── Groups ── */}
        <div style={{padding:"14px 16px 6px"}}>
          {EXPORT_GROUPS.map(g=>(
            <div key={g.key} style={{marginBottom:8}}>
              {/* Group header row */}
              <button
                onMouseDown={e=>{e.stopPropagation();setExpanded(expanded===g.key?null:g.key);}}
                style={{
                  width:"100%", display:"flex", alignItems:"center", gap:12,
                  background:expanded===g.key?`${g.color}14`:"rgba(255,255,255,0.03)",
                  border:`1px solid ${expanded===g.key?g.color+"40":"rgba(255,255,255,0.08)"}`,
                  borderRadius:12, padding:"11px 14px", cursor:"pointer",
                  transition:"all 0.15s", fontFamily:"'Inter',sans-serif",
                }}
                onMouseEnter={e=>{if(expanded!==g.key)(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.055)";}}
                onMouseLeave={e=>{if(expanded!==g.key)(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.03)";}}
              >
                <div style={{width:34,height:34,borderRadius:9,background:`${g.color}18`,border:`1px solid ${g.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>
                  {g.icon}
                </div>
                <span style={{fontSize:13,fontWeight:700,color:expanded===g.key?g.color:"rgba(255,255,255,0.75)",flex:1,textAlign:"left"}}>{g.label}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginRight:4}}>{g.items.length} options</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={expanded===g.key?g.color:"rgba(255,255,255,0.3)"} strokeWidth="2.5" strokeLinecap="round"
                  style={{transform:expanded===g.key?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.2s",flexShrink:0}}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {/* Expanded sub-items */}
              {expanded===g.key&&(
                <div style={{
                  marginTop:4, marginLeft:12, marginRight:2,
                  background:"rgba(0,0,0,0.25)", border:`1px solid ${g.color}22`,
                  borderRadius:11, overflow:"hidden",
                }}>
                  {g.items.map((item,ii)=>(
                    <button
                      key={ii}
                      onMouseDown={e=>{e.stopPropagation();close();}}
                      style={{
                        width:"100%", display:"flex", alignItems:"center", gap:10,
                        padding:"9px 14px", background:"none", border:"none",
                        borderBottom:ii<g.items.length-1?"1px solid rgba(255,255,255,0.045)":"none",
                        cursor:"pointer", fontFamily:"'Inter',sans-serif", transition:"background 0.1s",
                      }}
                      onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.05)"}
                      onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background="none"}
                    >
                      <div style={{width:28,height:28,borderRadius:7,background:`${g.color}14`,border:`1px solid ${g.color}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:14}}>
                        {item.icon}
                      </div>
                      <div style={{flex:1,textAlign:"left"}}>
                        <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.82)"}}>{item.label}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.28)",marginTop:1}}>{item.sub}</div>
                      </div>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.55" style={{flexShrink:0}}>
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{padding:"10px 20px 16px",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",gap:7,marginTop:2}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#34d399",flexShrink:0}} className="pulse"/>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.25)"}}>Data is always current &amp; live at time of export</span>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="export-wrap" style={{position:"relative",display:"inline-flex"}}>
      <button className="export-btn" onClick={()=>{setOpen(v=>!v);setExpanded(null);}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{transform:open?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.18s"}}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {modal}
    </div>
  );
};

/* ── INVENTORY COMPONENT ──────────────────────────────────────────── */
const Inventory = () => {
  const showToast = useToast();
  const TAX_RATE = 0.12;
  const today = new Date();
  const daysUntil = (d:string) => Math.ceil((new Date(d).getTime()-today.getTime())/(1000*60*60*24));

  const [view,setView]   = useState("main");
  const [inv,setInv]     = useState([
    {id:1, name:"Wireless Headphones", cat:"Electronics",  stocks:20, bp:650,  sp:750,  expiry:"2026-06-15"},
    {id:2, name:"Running Shoes",        cat:"Shoes",        stocks:50, bp:400,  sp:550,  expiry:"2027-01-10"},
    {id:3, name:"T-Shirts",             cat:"Clothing",     stocks:25, bp:320,  sp:550,  expiry:"2028-05-01"},
    {id:4, name:"Vitamin C 500mg",      cat:"Health",       stocks:8,  bp:120,  sp:185,  expiry:"2026-04-02"},
    {id:5, name:"Canned Sardines",      cat:"Food & Bev",   stocks:60, bp:45,   sp:72,   expiry:"2026-03-28"},
  ]);
  const [nP,setnP]   = useState({name:"",cat:"Electronics",supplier:"",bp:"",sp:"",stocks:0,expiry:""});
  const [dP,setdP]   = useState<any>(null);
  const [uP,setuP]   = useState<any>(null);
  const [q,setQ]     = useState("");
  const [newId,setNewId] = useState<number|null>(null);
  const [invErrors, setInvErrors] = useState<Record<string,boolean>>({});
  const [invShake,  setInvShake]  = useState(false);

  const invShakeForm = () => { setInvShake(true); setTimeout(()=>setInvShake(false),400); };
  const invClearErr  = (f:string) => setInvErrors(e=>({...e,[f]:false}));

  // ── Stock change log ──
  const [stockLog, setStockLog] = useState([
    {id:1, product:"Wireless Headphones", action:"Restock",    qty:"+20", user:"Juan dela Cruz",    ts:"2026-03-10 09:12 AM"},
    {id:2, product:"Running Shoes",        action:"Restock",    qty:"+50", user:"Maria Santos",      ts:"2026-03-10 09:30 AM"},
    {id:3, product:"T-Shirts",             action:"Restock",    qty:"+25", user:"Juan dela Cruz",    ts:"2026-03-11 02:14 PM"},
    {id:4, product:"Vitamin C 500mg",      action:"Sale",       qty:"-12", user:"Ana Reyes",         ts:"2026-03-12 11:05 AM"},
    {id:5, product:"Canned Sardines",      action:"Restock",    qty:"+60", user:"Carlo Mendoza",     ts:"2026-03-13 08:47 AM"},
    {id:6, product:"Wireless Headphones",  action:"Adjustment", qty:"-3",  user:"Juan dela Cruz",    ts:"2026-03-14 03:22 PM"},
  ]);

  // ── Undo ──
  const [hist,setHist] = useState<any[][]>([]);
  const save = () => setHist(h=>[...h, inv]);
  const undo = () => { if(hist.length){ setInv(hist[hist.length-1]); setHist(h=>h.slice(0,-1)); } };

  const addLog = (product:string, action:string, qty:string, user="Juan dela Cruz") => {
    const now = new Date();
    const ts = now.toLocaleString("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});
    setStockLog(l=>[{id:l.length+1,product,action,qty,user,ts},...l]);
  };

  const add = () => {
    const errs: Record<string,boolean> = {};
    if(!nP.name)       errs.name = true;
    if(!nP.bp)         errs.bp   = true;
    if(!nP.sp)         errs.sp   = true;
    if(Object.keys(errs).length){ setInvErrors(errs); invShakeForm(); return; }
    setInvErrors({});
    save();
    const id = Math.max(0,...inv.map(i=>i.id))+1;
    setInv(p=>[...p,{id,name:nP.name,cat:nP.cat,stocks:nP.stocks,bp:+nP.bp,sp:+nP.sp,expiry:nP.expiry||""}]);
    addLog(nP.name,"Added",`+${nP.stocks}`);
    setNewId(id);
    setTimeout(()=>setNewId(null),1200);
    setnP({name:"",cat:"Electronics",supplier:"",bp:"",sp:"",stocks:0,expiry:""});
    showToast(`"${nP.name}" added to inventory! 🎉`);
    setView("main");
  };
  const del = () => {
    if(dP){ save(); addLog(dP.name,"Deleted","—"); setInv(p=>p.filter(i=>i.id!==dP.id)); showToast(`"${dP.name}" deleted successfully`,"info"); setdP(null); }
  };
  const upd = () => {
    if(uP){
      const errs: Record<string,boolean> = {};
      if(!uP.name) errs.uname = true;
      if(!uP.bp)   errs.ubp   = true;
      if(!uP.sp)   errs.usp   = true;
      if(Object.keys(errs).length){ setInvErrors(errs); invShakeForm(); return; }
      setInvErrors({});
      const old = inv.find(i=>i.id===uP.id);
      const diff = uP.stocks-(old?.stocks||0);
      save();
      setInv(p=>p.map(i=>i.id===uP.id?uP:i));
      addLog(uP.name,"Updated", diff>=0?`+${diff}`:`${diff}`);
      showToast(`"${uP.name}" updated successfully! ✏️`);
      setView("main");
    }
  };

  const stat = (s:number) => s<=0?{l:"Out of Stock",c:"badge-r"}:s<=20?{l:"Low Stock",c:"badge-a"}:{l:"In Stock",c:"badge-g"};
  const fil  = inv.filter(i=>i.name.toLowerCase().includes(q.toLowerCase())||i.cat.toLowerCase().includes(q.toLowerCase()));
  const cats = ["Electronics","Shoes","Clothing","Accessories","Sports Equipment","Beauty Products","Food & Beverages","Health"];

  // ── Expiry helpers ──
  const expiring  = inv.filter(i=>i.expiry && daysUntil(i.expiry)<=30 && daysUntil(i.expiry)>0);
  const expired   = inv.filter(i=>i.expiry && daysUntil(i.expiry)<=0);
  const expiryColor = (d:string) => { const n=daysUntil(d); return n<=0?"#fb7185":n<=7?"#f97316":n<=30?"#fbbf24":"#34d399"; };
  const expiryBg    = (d:string) => { const n=daysUntil(d); return n<=0?"rgba(251,113,133,0.12)":n<=7?"rgba(249,115,22,0.1)":n<=30?"rgba(251,191,36,0.08)":"rgba(52,211,153,0.06)"; };
  const expiryLabel = (d:string) => { const n=daysUntil(d); return n<=0?"Expired":n<=7?`${n}d left`:n<=30?`${n}d left`:""; };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>

      {/* ── Expiry alert banner ── */}
      {(expired.length>0||expiring.length>0)&&(
        <div className="fu1 expiry-warn" style={{background:"rgba(251,113,133,0.07)",border:"1px solid rgba(251,113,133,0.25)",borderRadius:14,padding:"14px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span className="warn-icon" style={{fontSize:20}}>⚠️</span>
            <span style={{fontSize:13,fontWeight:700,color:"#fda4af"}}>
              {expired.length>0&&`${expired.length} expired product${expired.length>1?"s":""}`}
              {expired.length>0&&expiring.length>0&&" · "}
              {expiring.length>0&&`${expiring.length} expiring within 30 days`}
            </span>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {[...expired,...expiring].map(i=>(
              <div key={i.id} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 12px",background:expiryBg(i.expiry),border:`1px solid ${expiryColor(i.expiry)}30`,borderRadius:999,fontSize:11}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:expiryColor(i.expiry),flexShrink:0}} className="pulse"/>
                <span style={{color:"rgba(255,255,255,0.75)",fontWeight:600}}>{i.name}</span>
                <span style={{color:expiryColor(i.expiry),fontWeight:700}}>{expiryLabel(i.expiry)||"Expires "+i.expiry}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Stat cards ── */}
      <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>
        <div className="card count-pop">
          <div className="card-title">Available Stock <button className="card-x"><X size={13}/></button></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:8}}>
              <span style={{fontSize:42,fontWeight:700,color:"#34d399"}}>{inv.reduce((a,i)=>a+i.stocks,0).toLocaleString()}</span>
              <span style={{fontSize:18,color:"rgba(52,211,153,0.7)",fontWeight:500}}>Items</span>
            </div>
            <div style={{padding:12,background:"rgba(52,211,153,0.1)",borderRadius:"50%"}}><PackageCheck size={28} color="#34d399"/></div>
          </div>
        </div>
        <div className="card count-pop" style={{animationDelay:"0.1s"}}>
          <div className="card-title">Low / Expired Alerts <button className="card-x"><X size={13}/></button></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{display:"flex",alignItems:"baseline",gap:8}}>
                <span style={{fontSize:36,fontWeight:700,color:"#fb7185"}}>{inv.filter(i=>i.stocks<=20).length}</span>
                <span style={{fontSize:14,color:"rgba(251,113,133,0.7)"}}>low stock</span>
              </div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:4}}>{expired.length} expired · {expiring.length} expiring soon</div>
            </div>
            <div style={{padding:12,background:"rgba(251,113,133,0.1)",borderRadius:"50%"}}><PackageMinus size={28} color="#fb7185"/></div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <Search size={14} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.3)"}}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products…" className="inp" style={{paddingLeft:36,width:240}}/>
          </div>
          <button onClick={()=>setQ("")} className="btn" style={{padding:"9px 12px"}}><Undo2 size={14}/></button>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[["add","+ Add"],["delete","Delete"],["update","Update"],["history","📋 Log"],["expiry","🗓 Expiry"]].map(([v,l])=>(
            <button key={v} onClick={()=>{if(v==="update"&&inv.length)setuP(inv[0]);setView(v);}}
              className="btn"
              style={v==="add"?{background:"rgba(52,211,153,0.12)",borderColor:"rgba(52,211,153,0.25)",color:"#6ee7b7"}:
                     v==="history"?{background:"rgba(129,140,248,0.1)",borderColor:"rgba(129,140,248,0.22)",color:"#a5b4fc"}:
                     v==="expiry"?{background:"rgba(251,191,36,0.1)",borderColor:"rgba(251,191,36,0.22)",color:"#fde68a"}:undefined}>
              {l}
            </button>
          ))}
          <button onClick={undo} disabled={!hist.length} className="btn" style={{opacity:hist.length?1:0.4,display:"flex",alignItems:"center",gap:6,background:hist.length?"rgba(52,211,153,0.12)":undefined,borderColor:hist.length?"rgba(52,211,153,0.2)":undefined,color:hist.length?"#6ee7b7":undefined}}>
            <Undo2 size={14}/> Undo
          </button>
        </div>
      </div>

      {/* ── Main table ── */}
      {view==="main"&&(
        <div className="card fu1" style={{padding:0}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:640}}>
              <thead><tr>{["Product","Category","Stocks","Buy Price","Sell Price","Expiry","Status"].map(h=><th key={h} className="th">{h}</th>)}</tr></thead>
              <tbody>
                {fil.length===0?(
                  <EmptyState q={q} icon="📦"
                    title={q?`No products matching "${q}"`:"No products in inventory"}
                    sub={q?"Try a different name or category":"Add your first product using the + Add button"}/>
                ):fil.map((item,idx)=>{
                  const s=stat(item.stocks);
                  const ec=item.expiry?expiryColor(item.expiry):"";
                  const el=item.expiry?expiryLabel(item.expiry):"";
                  return(
                    <tr key={item.id} className={`tr${item.id===newId?" row-new":""}`} style={{animationDelay:`${idx*40}ms`}}>
                      <td className="td" style={{color:"#38bdf8",fontWeight:600}}>{item.name}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{item.cat}</td>
                      <td className="td">
                        <span style={{color:item.stocks<=20?"#fbbf24":"rgba(255,255,255,0.65)",fontWeight:600}}>{item.stocks}</span>
                      </td>
                      <td className="td" style={{color:"#fda4af"}}>₱{item.bp.toFixed(2)}</td>
                      <td className="td" style={{color:"#6ee7b7"}}>₱{item.sp.toFixed(2)}</td>
                      <td className="td">
                        {item.expiry?(
                          <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:999,fontSize:11,fontWeight:700,background:expiryBg(item.expiry),color:ec,border:`1px solid ${ec}30`}}>
                            {el&&<span className={daysUntil(item.expiry)<=7?"pulse":""} style={{width:5,height:5,borderRadius:"50%",background:ec,flexShrink:0}}/>}
                            {el||item.expiry}
                          </span>
                        ):<span style={{color:"rgba(255,255,255,0.2)",fontSize:11}}>—</span>}
                      </td>
                      <td className="td"><span className={s.c}>{s.l}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add product ── */}
      {view==="add"&&(
        <div className={`card fu1${invShake?" form-shake":""}`}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
            <h2 style={{fontSize:18,fontWeight:700,color:"#fff"}}>Add New Product</h2>
            {Object.values(invErrors).some(Boolean)&&(
              <div style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.3)",borderRadius:10}}>
                <span style={{fontSize:14}}>⚠️</span>
                <span style={{fontSize:12,fontWeight:600,color:"#fda4af"}}>Please fill in all required fields</span>
              </div>
            )}
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:14,maxWidth:640}}>
            {([["Product Name","name","text"],["Supplier","supplier","text"],["Buy Price ₱","bp","number"],["Sell Price ₱","sp","number"]] as [string,string,string][]).map(([l,f,t])=>{
              const required = ["name","bp","sp"].includes(f);
              const hasErr = invErrors[f];
              return (
                <div key={f}>
                  <label className={hasErr?"lbl-err":""} style={{fontSize:11,fontWeight:700,color:hasErr?"#fda4af":"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>
                    {l.toUpperCase()}{required&&<span style={{color:"#fb7185",marginLeft:3}}>*</span>}
                  </label>
                  <input type={t} value={(nP as any)[f]}
                    onChange={e=>{setnP({...nP,[f]:e.target.value});invClearErr(f);}}
                    className={`inp${hasErr?" inp-err":""}`}
                    placeholder={hasErr?`${l} is required`:""}/>
                  {hasErr&&<div className="err-msg"><span>⚠</span>{l} is required</div>}
                </div>
              );
            })}
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>CATEGORY</label>
              <select value={nP.cat} onChange={e=>setnP({...nP,cat:e.target.value})} className="inp">{cats.map(c=><option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>EXPIRY DATE</label>
              <input type="date" value={nP.expiry} onChange={e=>setnP({...nP,expiry:e.target.value})} className="inp"/>
            </div>
            <div style={{gridColumn:"1/-1"}}>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:8}}>INITIAL STOCK</label>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <button onClick={()=>setnP({...nP,stocks:Math.max(0,nP.stocks-1)})} className="btn" style={{padding:"7px 12px"}}><Minus size={14}/></button>
                <input type="number" value={nP.stocks} onChange={e=>setnP({...nP,stocks:Math.max(0,+e.target.value||0)})} className="inp" style={{width:80,textAlign:"center"}}/>
                <button onClick={()=>setnP({...nP,stocks:nP.stocks+1})} className="btn" style={{padding:"7px 12px"}}><Plus size={14}/></button>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={add} className="btn-g">Add Product</button>
            <button onClick={()=>{setView("main");setInvErrors({});}} className="btn">Cancel</button>
          </div>
        </div>
      )}

      {/* ── Delete product ── */}
      {view==="delete"&&(
        <div className="card fu1">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <h2 style={{fontSize:18,fontWeight:700,color:"#fb7185"}}>Delete a Product</h2>
            <button onClick={()=>setView("main")} className="btn" style={{padding:"6px 12px",fontSize:12}}>← Back</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:14,maxWidth:640}}>
            <div style={{gridColumn:"1/-1"}}>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>SELECT PRODUCT</label>
              <select value={dP?.id||""} onChange={e=>setdP(inv.find(i=>i.id===+e.target.value)||null)} className="inp">
                <option value="">Choose product…</option>
                {inv.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
          </div>
          {dP&&(
            <div style={{marginTop:16,padding:16,background:"rgba(251,113,133,0.06)",border:"1px solid rgba(251,113,133,0.18)",borderRadius:12}}>
              <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,marginBottom:14}}>Delete <span style={{color:"#fda4af",fontWeight:700}}>{dP.name}</span>? This cannot be undone.</p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={del} className="btn-r">Confirm Delete</button>
                <button onClick={()=>setdP(null)} className="btn">Cancel</button>
              </div>
            </div>
          )}
          {!dP&&<button onClick={()=>setView("main")} className="btn" style={{marginTop:16}}>Close</button>}
        </div>
      )}

      {/* ── Update product ── */}
      {view==="update"&&(
        <div className={`card fu1${invShake?" form-shake":""}`}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
            <h2 style={{fontSize:18,fontWeight:700,color:"#fff"}}>Update Product</h2>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {Object.values(invErrors).some(Boolean)&&(
                <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.3)",borderRadius:10}}>
                  <span style={{fontSize:12,fontWeight:600,color:"#fda4af"}}>⚠️ Fill required fields</span>
                </div>
              )}
              <button onClick={()=>{setView("main");setInvErrors({});}} className="btn" style={{padding:"6px 12px",fontSize:12}}>← Back</button>
            </div>
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>SELECT PRODUCT</label>
            <select value={uP?.id||""} onChange={e=>setuP(inv.find(i=>i.id===+e.target.value)||null)} className="inp" style={{maxWidth:320}}>
              {inv.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          {uP&&(
            <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:14,maxWidth:640}}>
              {([["Product Name","uname","name","text"],["Buy Price ₱","ubp","bp","number"],["Sell Price ₱","usp","sp","number"]] as [string,string,string,string][]).map(([l,eKey,f,t])=>{
                const hasErr = invErrors[eKey];
                return (
                  <div key={f}>
                    <label className={hasErr?"lbl-err":""} style={{fontSize:11,fontWeight:700,color:hasErr?"#fda4af":"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>
                      {l.toUpperCase()}<span style={{color:"#fb7185",marginLeft:3}}>*</span>
                    </label>
                    <input type={t} value={uP[f]}
                      onChange={e=>{setuP({...uP,[f]:t==="number"?+e.target.value:e.target.value});invClearErr(eKey);}}
                      className={`inp${hasErr?" inp-err":""}`}/>
                    {hasErr&&<div className="err-msg"><span>⚠</span>{l} is required</div>}
                  </div>
                );
              })}
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>EXPIRY DATE</label>
                <input type="date" value={uP.expiry||""} onChange={e=>setuP({...uP,expiry:e.target.value})} className="inp"/>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:8}}>STOCK QTY</label>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>setuP({...uP,stocks:Math.max(0,uP.stocks-1)})} className="btn" style={{padding:"7px 12px"}}><Minus size={14}/></button>
                  <input type="number" value={uP.stocks} onChange={e=>setuP({...uP,stocks:Math.max(0,+e.target.value||0)})} className="inp" style={{width:80,textAlign:"center"}}/>
                  <button onClick={()=>setuP({...uP,stocks:uP.stocks+1})} className="btn" style={{padding:"7px 12px"}}><Plus size={14}/></button>
                </div>
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:10,marginTop:20}}>
            <button onClick={upd} className="btn-g">Save Changes</button>
            <button onClick={()=>{setView("main");setInvErrors({});}} className="btn">Cancel</button>
          </div>
        </div>
      )}

      {/* ── Stock change log ── */}
      {view==="history"&&(
        <div className="card fu1">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:"rgba(129,140,248,0.12)",border:"1px solid rgba(129,140,248,0.22)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <ClipboardList size={16} color="#818cf8"/>
              </div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Stock Change Log</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1}}>Every add, update and delete is recorded here</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <ExportMenu label="Export Log"/>
              <button onClick={()=>setView("main")} className="btn" style={{padding:"7px 14px",fontSize:12}}>← Back</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {stockLog.map((entry,i)=>{
              const isAdd   = entry.action==="Added"||entry.qty.startsWith("+");
              const isDel   = entry.action==="Deleted";
              const isAdj   = entry.action==="Adjustment";
              const color   = isDel?"#fb7185":isAdd?"#34d399":"#fbbf24";
              const bg      = isDel?"rgba(251,113,133,0.06)":isAdd?"rgba(52,211,153,0.05)":"rgba(251,191,36,0.05)";
              const icon    = isDel?"🗑️":entry.action==="Added"?"📦":entry.action==="Sale"?"🛒":"✏️";
              return (
                <div key={entry.id} className="row-new" style={{
                  animationDelay:`${i*40}ms`,
                  display:"flex",alignItems:"center",gap:14,
                  padding:"12px 16px",
                  background:bg,
                  border:`1px solid ${color}18`,
                  borderRadius:12,
                  flexWrap:"wrap",
                }}>
                  <div style={{width:34,height:34,borderRadius:10,background:`${color}15`,border:`1px solid ${color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
                  <div style={{flex:1,minWidth:120}}>
                    <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.85)"}}>{entry.product}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>{entry.action}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:15,fontWeight:800,color}}>{entry.qty}</span>
                    <span style={{fontSize:10,color:"rgba(255,255,255,0.25)"}}>units</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",background:"rgba(255,255,255,0.03)",borderRadius:999,border:"1px solid rgba(255,255,255,0.07)"}}>
                    <User size={11} color="rgba(255,255,255,0.4)"/>
                    <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600}}>{entry.user}</span>
                  </div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.28)",fontFamily:"monospace",flexShrink:0}}>{entry.ts}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Expiry tracker ── */}
      {view==="expiry"&&(
        <div className="card fu1">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:"rgba(251,191,36,0.12)",border:"1px solid rgba(251,191,36,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🗓</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Expiry Date Tracker</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1}}>Monitor product shelf life and act before it's too late</div>
              </div>
            </div>
            <button onClick={()=>setView("main")} className="btn" style={{padding:"7px 14px",fontSize:12}}>← Back</button>
          </div>

          {/* Legend */}
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
            {[{c:"#fb7185",l:"Expired"},{c:"#f97316",l:"≤ 7 days"},{c:"#fbbf24",l:"≤ 30 days"},{c:"#34d399",l:"Safe"}].map(b=>(
              <div key={b.l} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",background:`${b.c}10`,border:`1px solid ${b.c}25`,borderRadius:999,fontSize:11,color:b.c,fontWeight:600}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:b.c}}/>
                {b.l}
              </div>
            ))}
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[...inv].sort((a,b)=>new Date(a.expiry||"2099-01-01").getTime()-new Date(b.expiry||"2099-01-01").getTime()).map((item,i)=>{
              if(!item.expiry) return null;
              const days = daysUntil(item.expiry);
              const c = expiryColor(item.expiry);
              const pct = Math.max(0,Math.min(100,100-(days/365*100)));
              return (
                <div key={item.id} className="row-new" style={{animationDelay:`${i*50}ms`,padding:"14px 16px",background:`${c}08`,border:`1.5px solid ${c}25`,borderRadius:14}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.85)"}}>{item.name}</span>
                      <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.05)",padding:"2px 8px",borderRadius:999}}>{item.cat}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Expires: <span style={{color:c,fontWeight:700}}>{item.expiry}</span></span>
                      <span style={{fontSize:13,fontWeight:800,color:c,padding:"3px 12px",background:`${c}15`,border:`1px solid ${c}30`,borderRadius:999,animation:days<=7?"expiryPulse 2s ease infinite":"none"}}>
                        {days<=0?"EXPIRED":`${days}d`}
                      </span>
                    </div>
                  </div>
                  {/* Days bar */}
                  <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,Math.max(0,(365-days)/365*100))}%`,background:`linear-gradient(90deg,${c}80,${c})`,borderRadius:99,transition:"width 0.5s ease"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── SALES COMPONENT ──────────────────────────────────────────────── */
const Sales = () => {
  const TAX_RATE = 0.12;
  const [tab, setTab] = useState("Daily");

  const salesData: Record<string, {id:number;name:string;cat:string;qty:number;bp:number;sp:number}[]> = {
    Daily: [
      {id:1, name:"Wireless Headphones", cat:"Electronics", qty:5,  bp:650,  sp:750},
      {id:2, name:"Running Shoes",        cat:"Footwear",    qty:12, bp:400,  sp:550},
      {id:3, name:"T-Shirts",             cat:"Clothing",    qty:8,  bp:320,  sp:550},
      {id:4, name:"PS5",                  cat:"Electronics", qty:2,  bp:18000,sp:22000},
      {id:5, name:"Tilapia",              cat:"Food",        qty:3,  bp:120,  sp:160},
      {id:6, name:"Vitamin C 500mg",      cat:"Health",      qty:1,  bp:120,  sp:185},
    ],
    Monthly: [
      {id:1, name:"Wireless Headphones", cat:"Electronics", qty:60,  bp:650,  sp:750},
      {id:2, name:"Running Shoes",        cat:"Footwear",    qty:140, bp:400,  sp:550},
      {id:3, name:"T-Shirts",             cat:"Clothing",    qty:95,  bp:320,  sp:550},
      {id:4, name:"PS5",                  cat:"Electronics", qty:25,  bp:18000,sp:22000},
      {id:5, name:"Tilapia",              cat:"Food",        qty:18,  bp:120,  sp:160},
      {id:6, name:"Vitamin C 500mg",      cat:"Health",      qty:8,   bp:120,  sp:185},
    ],
    Yearly: [
      {id:1, name:"Wireless Headphones", cat:"Electronics", qty:720,  bp:650,  sp:750},
      {id:2, name:"Running Shoes",        cat:"Footwear",    qty:1680, bp:400,  sp:550},
      {id:3, name:"T-Shirts",             cat:"Clothing",    qty:1140, bp:320,  sp:550},
      {id:4, name:"PS5",                  cat:"Electronics", qty:300,  bp:18000,sp:22000},
      {id:5, name:"Tilapia",              cat:"Food",        qty:216,  bp:120,  sp:160},
      {id:6, name:"Vitamin C 500mg",      cat:"Health",      qty:96,   bp:120,  sp:185},
    ],
  };

  const items = salesData[tab];

  // ── Auto-computed values ──
  const rows = items.map(i=>{
    const totalSales  = i.qty * i.sp;
    const totalCost   = i.qty * i.bp;
    const profit      = totalSales - totalCost;
    const tax         = totalSales * TAX_RATE;
    const netProfit   = profit - tax;
    const margin      = totalSales > 0 ? (profit/totalSales*100) : 0;
    return {...i, totalSales, totalCost, profit, tax, netProfit, margin};
  });

  const totals = rows.reduce((a,r)=>({
    sales:   a.sales   + r.totalSales,
    cost:    a.cost    + r.totalCost,
    profit:  a.profit  + r.profit,
    tax:     a.tax     + r.tax,
    net:     a.net     + r.netProfit,
    qty:     a.qty     + r.qty,
  }),{sales:0,cost:0,profit:0,tax:0,net:0,qty:0});

  const sortedByQty    = [...rows].sort((a,b)=>b.qty-a.qty);
  const bestSellers    = sortedByQty.slice(0,2);
  const slowMovers     = sortedByQty.slice(-2).reverse();

  const fmt = (v:number) => `₱${v.toLocaleString("en-PH",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

  const StatCard = ({icon,label,value,sub,color,bg}:{icon:string;label:string;value:string;sub?:string;color:string;bg:string}) => (
    <div className="card count-pop" style={{background:bg,border:`1px solid ${color}25`}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
        <div style={{fontSize:10,fontWeight:700,color:`${color}bb`,letterSpacing:"0.08em"}}>{label.toUpperCase()}</div>
        <span style={{fontSize:20}}>{icon}</span>
      </div>
      <div style={{fontSize:22,fontWeight:800,color,lineHeight:1,marginBottom:4}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{sub}</div>}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>

      {/* ── Summary stat cards ── */}
      <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:14}}>
        <StatCard icon="💰" label="Total Sales"  value={fmt(totals.sales)}  sub={`${totals.qty} units sold`}           color="#34d399" bg="rgba(52,211,153,0.06)"/>
        <StatCard icon="📈" label="Gross Profit" value={fmt(totals.profit)} sub={`Margin: ${(totals.profit/totals.sales*100).toFixed(1)}%`} color="#38bdf8" bg="rgba(56,189,248,0.06)"/>
        <StatCard icon="🧾" label="Tax (12% VAT)" value={fmt(totals.tax)}   sub="Value-added tax"                       color="#fbbf24" bg="rgba(251,191,36,0.06)"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:14}}>
        <StatCard icon="🏆" label="Net Profit"   value={fmt(totals.net)}    sub="After tax deduction"                   color="#a78bfa" bg="rgba(167,139,250,0.06)"/>
        <StatCard icon="📦" label="Total COGS"   value={fmt(totals.cost)}   sub="Cost of goods sold"                    color="#fb7185" bg="rgba(251,113,133,0.06)"/>
      </div>

      {/* ── Best & slow movers ── */}
      <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:14}}>

        {/* Best sellers */}
        <div className="card fu2">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{width:32,height:32,borderRadius:9,background:"rgba(52,211,153,0.12)",border:"1px solid rgba(52,211,153,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🏆</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Best Sellers</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Top performing — {tab.toLowerCase()}</div>
            </div>
          </div>
          {bestSellers.map((item,i)=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<bestSellers.length-1?10:0}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(52,211,153,0.12)",border:"1px solid rgba(52,211,153,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#34d399",flexShrink:0}}>#{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.85)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{item.qty} units · {fmt(item.totalSales)}</div>
                <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:99,marginTop:5}}>
                  <div style={{height:"100%",width:`${Math.min(100,(item.qty/sortedByQty[0].qty)*100)}%`,background:"linear-gradient(90deg,#34d399,#38bdf8)",borderRadius:99}}/>
                </div>
              </div>
              <span className="chip-up"><TrendingUp size={9}/> {item.margin.toFixed(0)}%</span>
            </div>
          ))}
        </div>

        {/* Slow movers */}
        <div className="card fu2">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{width:32,height:32,borderRadius:9,background:"rgba(251,113,133,0.12)",border:"1px solid rgba(251,113,133,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🐢</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Slow Movers</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Low volume — need attention</div>
            </div>
          </div>
          {slowMovers.map((item,i)=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:i<slowMovers.length-1?10:0}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"rgba(255,255,255,0.3)",flexShrink:0}}>⚠</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.75)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.name}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{item.qty} units · {fmt(item.totalSales)}</div>
                <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:99,marginTop:5}}>
                  <div style={{height:"100%",width:`${Math.min(100,(item.qty/sortedByQty[0].qty)*100)}%`,background:"linear-gradient(90deg,#fb7185,#f97316)",borderRadius:99}}/>
                </div>
              </div>
              <span className="chip-down"><TrendingDown size={9}/> {item.margin.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sales table ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div className="tab-wrap">
          {["Daily","Monthly","Yearly"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={tab===t?"tab-on":"tab-off"}>{t}</button>
          ))}
        </div>
        <ExportMenu label="Export Sales"/>
      </div>

      <div className="card fu3" style={{padding:0}}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",minWidth:780}}>
            <thead>
              <tr>
                {["Product","Category","Qty Sold","Total Sales","COGS","Gross Profit","Tax (12%)","Net Profit","Margin"].map(h=>(
                  <th key={h} className="th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item,idx)=>(
                <tr key={item.id} className="tr row-new" style={{animationDelay:`${idx*40}ms`}}>
                  <td className="td" style={{color:"#38bdf8",fontWeight:600,whiteSpace:"nowrap"}}>{item.name}</td>
                  <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{item.cat}</td>
                  <td className="td" style={{color:"rgba(255,255,255,0.7)",fontWeight:600}}>{item.qty}</td>
                  <td className="td" style={{color:"#6ee7b7",fontWeight:600}}>{fmt(item.totalSales)}</td>
                  <td className="td" style={{color:"rgba(255,255,255,0.45)"}}>{fmt(item.totalCost)}</td>
                  <td className="td" style={{color:"#34d399",fontWeight:600}}>{fmt(item.profit)}</td>
                  <td className="td" style={{color:"#fbbf24"}}>{fmt(item.tax)}</td>
                  <td className="td" style={{color:"#a78bfa",fontWeight:700}}>{fmt(item.netProfit)}</td>
                  <td className="td">
                    <span style={{
                      display:"inline-flex",alignItems:"center",gap:4,
                      padding:"3px 10px",borderRadius:999,fontSize:11,fontWeight:700,
                      background:item.margin>=30?"rgba(52,211,153,0.1)":item.margin>=15?"rgba(251,191,36,0.1)":"rgba(251,113,133,0.1)",
                      color:item.margin>=30?"#34d399":item.margin>=15?"#fbbf24":"#fb7185",
                    }}>
                      {item.margin>=30?<TrendingUp size={9}/>:<TrendingDown size={9}/>}
                      {item.margin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Totals row */}
            <tfoot>
              <tr style={{borderTop:"2px solid rgba(255,255,255,0.08)"}}>
                <td className="td" colSpan={2} style={{fontWeight:800,color:"rgba(255,255,255,0.7)",fontSize:12,letterSpacing:"0.05em"}}>TOTAL</td>
                <td className="td" style={{fontWeight:700,color:"rgba(255,255,255,0.7)"}}>{totals.qty}</td>
                <td className="td" style={{fontWeight:800,color:"#6ee7b7"}}>{fmt(totals.sales)}</td>
                <td className="td" style={{fontWeight:700,color:"rgba(255,255,255,0.45)"}}>{fmt(totals.cost)}</td>
                <td className="td" style={{fontWeight:800,color:"#34d399"}}>{fmt(totals.profit)}</td>
                <td className="td" style={{fontWeight:700,color:"#fbbf24"}}>{fmt(totals.tax)}</td>
                <td className="td" style={{fontWeight:800,color:"#a78bfa"}}>{fmt(totals.net)}</td>
                <td className="td" style={{fontWeight:700,color:"rgba(255,255,255,0.4)",fontSize:12}}>{(totals.profit/totals.sales*100).toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Tax info note */}
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",background:"rgba(251,191,36,0.05)",border:"1px solid rgba(251,191,36,0.15)",borderRadius:10}}>
        <span style={{fontSize:14}}>🧾</span>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Tax computed at <strong style={{color:"#fbbf24"}}>12% VAT</strong> on gross sales. Net Profit = Gross Profit − Tax. Adjust tax rate in <strong style={{color:"rgba(255,255,255,0.5)"}}>Settings → Default Values</strong>.</span>
      </div>
    </div>
  );
};

/* ── SUPPLIER COMPONENT ───────────────────────────────────────────── */
const Supplier = () => {
  const showToast = useToast();
  const [view,setView] = useState("main");
  const [sups,setSups] = useState([
    {id:1,name:"Mitsibuchi",contact:"09165354751",email:"mitsubuchi@gmail.com",products:"Elesi",stocks:20,fav:true},
    {id:2,name:"Takoyuki",contact:"09465133535",email:"Takuyuki@gmail.com",products:"Oil",stocks:30,fav:false},
    {id:3,name:"Bebangs Electronics",contact:"094165433121",email:"BebangsElec@gmail.com",products:"Phone Case",stocks:25,fav:true},
  ]);
  const [nS,setnS]=useState({name:"",contact:"",email:"",products:"",stocks:0,fav:false});
  const [supErrors, setSupErrors] = useState<Record<string,boolean>>({});
  const [supShake,  setSupShake]  = useState(false);
  const supShakeForm = () => { setSupShake(true); setTimeout(()=>setSupShake(false),400); };
  const supClearErr  = (f:string) => setSupErrors(e=>({...e,[f]:false}));
  const [eS,seteS]=useState<any>(null);
  const [dS,setdS]=useState<any>(null);
  const [q,setQ]=useState("");
  const [hist,setHist]=useState<any[][]>([]);
  const txs=[
    {id:1,name:"Mitsibuchi",contact:"09165354751",item:"Elesi",value:20,date:"2024-03-15",by:"Juan Dela Cruz",status:"Success"},
    {id:2,name:"Takoyuki",contact:"09465133535",item:"Oil",value:30,date:"2024-05-21",by:"Kenzo Buan",status:"Pending"},
    {id:3,name:"Bebangs Electronics",contact:"094165433121",item:"Phone Case",value:25,date:"2024-03-25",by:"Dirit Espanto",status:"Failed"},
  ];
  const save=()=>setHist(h=>[...h,sups]);
  const undo=()=>{if(hist.length){setSups(hist[hist.length-1]);setHist(h=>h.slice(0,-1));}};
  const addS=()=>{
    const errs:Record<string,boolean>={};
    if(!nS.name)     errs.name=true;
    if(!nS.contact)  errs.contact=true;
    if(!nS.products) errs.products=true;
    if(Object.keys(errs).length){setSupErrors(errs);supShakeForm();return;}
    setSupErrors({});
    save();setSups(p=>[...p,{...nS,id:Math.max(0,...p.map(s=>s.id))+1}]);
    showToast(`"${nS.name}" added as supplier! 🏢`);
    setnS({name:"",contact:"",email:"",products:"",stocks:0,fav:false});setView("main");
  };
  const delS=()=>{if(dS){save();setSups(p=>p.filter(s=>s.id!==dS.id));showToast(`"${dS.name}" removed`,"info");setdS(null);setView("main");}};
  const updS=()=>{if(eS){save();setSups(p=>p.map(s=>s.id===eS.id?eS:s));showToast(`"${eS.name}" updated successfully! ✏️`);setView("main");}};
  const fil=sups.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()));

  if(view==="tx") return (
    <div className="card">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:20,fontWeight:700,color:"#fff"}}>Transaction History</h2>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <ExportMenu label="Export Transactions"/>
          <button onClick={()=>setView("main")} className="btn">← Back</button>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr>{["Supplier Name","Contact Number","Item","Value","Date","Recorded by","Status"].map(h=><th key={h} className="th">{h}</th>)}</tr></thead>
        <tbody>
          {txs.map(t=>(
            <tr key={t.id} className="tr">
              <td className="td" style={{color:"rgba(255,255,255,0.8)"}}>{t.name}</td>
              <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{t.contact}</td>
              <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{t.item}</td>
              <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{t.value}</td>
              <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{t.date}</td>
              <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{t.by}</td>
              <td className="td"><span className={t.status==="Success"?"badge-g":t.status==="Pending"?"badge-a":"badge-r"}>{t.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:10}}>
          <div style={{position:"relative"}}>
            <Search size={14} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.3)"}}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search suppliers..." className="inp" style={{paddingLeft:36,width:240}}/>
          </div>
          <button onClick={()=>setQ("")} className="btn" style={{padding:"9px 12px"}}><Undo2 size={14}/></button>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[["add","Add Supplier"],["delete","Delete Supplier"],["update","Edit Supplier"]].map(([v,l])=>(
            <button key={v} onClick={()=>{if(v==="update"&&sups.length)seteS(sups[0]);setView(v);}} className="btn">{l}</button>
          ))}
          <button onClick={undo} disabled={!hist.length} className="btn" style={{opacity:hist.length?1:0.4,display:"flex",alignItems:"center",gap:6,background:hist.length?"rgba(52,211,153,0.12)":undefined,color:hist.length?"#6ee7b7":undefined}}><Undo2 size={14}/> Undo</button>
        </div>
      </div>
      {view==="main"&&(
        <>
          <div className="card" style={{padding:0}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["Supplier Name","Contact Number","Email Address","Products Supplied","Stocks","Favorite Supplier"].map(h=><th key={h} className="th">{h}</th>)}</tr></thead>
                <tbody>
                  {fil.length===0?(
                    <EmptyState q={q} icon="🏢"
                      title={q?`No suppliers matching "${q}"`:"No suppliers yet"}
                      sub={q?"Try a different supplier name":"Add your first supplier using Add Supplier"}/>
                  ):fil.map(s=>(
                    <tr key={s.id} className="tr">
                      <td className="td" style={{color:"#38bdf8",fontWeight:500}}>{s.name}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.55)"}}>{s.contact}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.55)"}}>{s.email}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.55)"}}>{s.products}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.55)"}}>{s.stocks}</td>
                      <td className="td">{s.fav&&<Star size={20} color="#fbbf24" fill="#fbbf24" style={{margin:"0 auto"}}/>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <button onClick={()=>setView("tx")} className="btn" style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 24px"}}>
              <span style={{fontWeight:600,fontSize:14}}>Transaction History</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>Overview the Supplier</span>
            </button>
          </div>
          <div>
            <h3 style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.6)",marginBottom:12}}>Incoming Deliveries</h3>
            {[{name:"Kenzo",delay:"0s"},{name:"Mel Chor",delay:"-6s"}].map(d=>(
              <div key={d.name} className="card" style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.5)",fontSize:13}}><MapPin size={13} color="#38bdf8"/>Supplier ({d.name})</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.5)",fontSize:13}}>Your Store <Store size={13} color="#34d399"/></div>
                </div>
                <div style={{position:"relative",height:6,background:"rgba(255,255,255,0.06)",borderRadius:99,marginTop:20,marginBottom:6}}>
                  <div style={{position:"absolute",top:0,left:0,height:"100%",borderRadius:99,background:"linear-gradient(90deg,#38bdf8,#34d399)",animation:`pGrow 12s ease-in-out infinite`,animationDelay:d.delay}}/>
                  <div style={{position:"absolute",top:"50%",transform:"translateY(-50%) translateX(-50%)",animation:`tMove 12s ease-in-out infinite`,animationDelay:d.delay}}>
                    <Truck size={30} color="#fff" style={{filter:"drop-shadow(0 0 8px rgba(56,189,248,0.5))"}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {view==="add"&&(
        <div className={`card${supShake?" form-shake":""}`}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:10}}>
            <h2 style={{fontSize:20,fontWeight:700,color:"#fff"}}>Add New Supplier</h2>
            {Object.values(supErrors).some(Boolean)&&(
              <div style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.3)",borderRadius:10}}>
                <span style={{fontSize:14}}>⚠️</span>
                <span style={{fontSize:12,fontWeight:600,color:"#fda4af"}}>Please fill in all required fields</span>
              </div>
            )}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14,maxWidth:520}}>
            {([["Supplier Name","name",true],["Contact Number","contact",true],["Email Address","email",false],["Products Supplied","products",true]] as [string,string,boolean][]).map(([l,f,req])=>{
              const hasErr = supErrors[f];
              return (
                <div key={f}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
                    <label style={{width:180,fontSize:14,color:hasErr?"#fda4af":"rgba(255,255,255,0.5)",fontWeight:500,flexShrink:0,paddingTop:10}}>
                      {l}{req&&<span style={{color:"#fb7185",marginLeft:3}}>*</span>}
                    </label>
                    <div style={{flex:1}}>
                      <input value={(nS as any)[f]}
                        onChange={e=>{setnS({...nS,[f]:e.target.value});supClearErr(f);}}
                        className={`inp${hasErr?" inp-err":""}`}
                        placeholder={hasErr?`${l} is required`:""}/>
                      {hasErr&&<div className="err-msg"><span>⚠</span>{l} is required</div>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <label style={{width:180,fontSize:14,color:"rgba(255,255,255,0.5)"}}>Favorite</label>
              <button onClick={()=>setnS({...nS,fav:!nS.fav})} style={{width:40,height:40,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:nS.fav?"rgba(251,191,36,0.15)":"rgba(255,255,255,0.05)",border:`1px solid ${nS.fav?"rgba(251,191,36,0.3)":"rgba(255,255,255,0.1)"}`}}>
                <Star size={18} color="#fbbf24" fill={nS.fav?"#fbbf24":"transparent"}/>
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:24}}>
            <button onClick={addS} className="btn-g">CONFIRM</button>
            <button onClick={()=>{setView("main");setSupErrors({});}} className="btn">CLOSE</button>
          </div>
        </div>
      )}
      {view==="delete"&&(
        <div className="card">
          <h2 style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:20}}>Delete Supplier</h2>
          <div style={{display:"flex",alignItems:"center",gap:16,maxWidth:520,marginBottom:16}}>
            <label style={{width:180,fontSize:14,color:"rgba(255,255,255,0.5)"}}>Supplier Name</label>
            <select value={dS?.id||""} onChange={e=>setdS(sups.find(s=>s.id===+e.target.value)||null)} className="inp" style={{flex:1}}>
              <option value="">Select supplier to delete</option>
              {sups.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          {dS&&(
            <div style={{maxWidth:520,padding:20,borderRadius:14,background:"rgba(251,113,133,0.06)",border:"1px solid rgba(251,113,133,0.15)",marginBottom:16}}>
              <p style={{color:"rgba(255,255,255,0.45)",fontSize:14,marginBottom:14}}>Delete <span style={{color:"#fda4af",fontWeight:600}}>{dS.name}</span>?</p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={delS} className="btn-r">CONFIRM DELETE</button>
                <button onClick={()=>setdS(null)} className="btn">CANCEL</button>
              </div>
            </div>
          )}
          {!dS&&<button onClick={()=>setView("main")} className="btn">CLOSE</button>}
        </div>
      )}
      {view==="update"&&(
        <div className="card">
          <h2 style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:20}}>Edit Supplier</h2>
          <div style={{display:"flex",alignItems:"center",gap:16,maxWidth:520,marginBottom:20}}>
            <label style={{width:180,fontSize:14,color:"rgba(255,255,255,0.5)"}}>Select Supplier</label>
            <select value={eS?.id||""} onChange={e=>seteS(sups.find(s=>s.id===+e.target.value)||null)} className="inp" style={{flex:1}}>
              {sups.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          {eS&&(
            <div style={{display:"flex",flexDirection:"column",gap:14,maxWidth:520}}>
              {[["Name","name"],["Contact","contact"],["Email","email"],["Products","products"]].map(([l,f])=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:16}}>
                  <label style={{width:180,fontSize:14,color:"rgba(255,255,255,0.5)"}}>{l}</label>
                  <input value={eS[f]} onChange={e=>seteS({...eS,[f]:e.target.value})} className="inp" style={{flex:1}}/>
                </div>
              ))}
            </div>
          )}
          <div style={{display:"flex",gap:10,marginTop:24}}>
            <button onClick={updS} className="btn-g">CONFIRM</button>
            <button onClick={()=>setView("main")} className="btn">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── INVENTORY PLANNING PAGE ──────────────────────────────────────── */
const InventoryPlanning = ({ onBack }: { onBack: () => void }) => {
  const [urgFilter, setUrgFilter] = useState("All");

  const urgMap: Record<string,{label:string,chip:string,color:string,bg:string,border:string}> = {
    critical: {label:"Critical",  chip:"badge-r",  color:"#fb7185", bg:"rgba(251,113,133,0.08)", border:"rgba(251,113,133,0.2)"},
    high:     {label:"High",      chip:"badge-a",  color:"#fbbf24", bg:"rgba(251,191,36,0.07)",  border:"rgba(251,191,36,0.2)"},
    medium:   {label:"Medium",    chip:"badge-v",  color:"#818cf8", bg:"rgba(129,140,248,0.07)", border:"rgba(129,140,248,0.2)"},
    low:      {label:"Low",       chip:"badge-g",  color:"#34d399", bg:"rgba(52,211,153,0.07)",  border:"rgba(52,211,153,0.2)"},
  };

  const filtered = urgFilter === "All" ? INV_PRODUCTS : INV_PRODUCTS.filter(p => p.urgency === urgFilter.toLowerCase());
  const critical  = INV_PRODUCTS.filter(p => p.urgency === "critical");
  const urgent    = INV_PRODUCTS.filter(p => p.urgency === "critical" || p.urgency === "high");

  // Stock vs Demand chart data
  const stockDemandData = INV_PRODUCTS.slice(0, 8).map(p => ({
    name: p.name.length > 10 ? p.name.slice(0, 10) + "…" : p.name,
    stock:  p.stock,
    demand: p.demand,
    restock: Math.max(0, p.restock - p.stock),
  }));

  // Products needing restock bar chart (sorted by gap)
  const restockGapData = [...INV_PRODUCTS]
    .map(p => ({ name: p.name.length > 12 ? p.name.slice(0,12)+"…" : p.name, gap: p.restock - p.stock, urgency: p.urgency }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 8);

  const TooltipInv = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
        <div style={{color:"rgba(255,255,255,0.5)",marginBottom:6,fontWeight:600}}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:p.color||p.fill}}/>
            <span style={{color:"rgba(255,255,255,0.6)",textTransform:"capitalize"}}>{p.name}:</span>
            <span style={{color:"#fff",fontWeight:700}}>{p.value} units</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ── Header ── */}
      <div className="fu1" style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <button onClick={onBack} className="btn" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
          <ArrowLeft size={15}/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(251,191,36,0.15)",border:"1px solid rgba(251,191,36,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Boxes size={20} color="#fbbf24"/>
          </div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#fff"}}>Inventory Planning</h1>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:2}}>AI-powered restocking decisions based on demand forecasts and stock levels</p>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,background:"rgba(251,191,36,0.08)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:10,padding:"6px 14px"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#fbbf24"}} className="pulse"/>
          <span style={{fontSize:12,color:"#fde68a",fontWeight:600}}>Model: Active</span>
        </div>
      </div>

      {/* ── Critical Alerts Banner ── */}
      {critical.length > 0 && (
        <div className="fu2" style={{background:"rgba(251,113,133,0.07)",border:"1px solid rgba(251,113,133,0.2)",borderRadius:14,padding:"14px 20px",display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:2}}>
            <AlertTriangle size={16} color="#fb7185"/>
            <span style={{fontSize:13,fontWeight:700,color:"#fb7185"}}>Critical Stock Alerts — Immediate Restocking Required</span>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {critical.map(p => (
              <div key={p.id} style={{background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.25)",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:10}}>
                <AlertTriangle size={13} color="#fb7185"/>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.8)",fontWeight:500}}>
                  <span style={{color:"#fda4af",fontWeight:700}}>{p.name}</span>
                  {" "}— may run out in <span style={{color:"#fb7185",fontWeight:700}}>{p.daysLeft} {p.daysLeft === 1 ? "day" : "days"}</span>. Stock: {p.stock} / Demand: {p.demand}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── KPI Cards ── */}
      <div className="fu2 grid-4col" style={{display:"grid",gridTemplateColumns:colsW(4),gap:16}}>
        {[
          {label:"Critical Items",    value:String(INV_PRODUCTS.filter(p=>p.urgency==="critical").length), sub:"Need restock today",   color:"#fb7185", bg:"rgba(251,113,133,0.1)", I:AlertTriangle},
          {label:"High Priority",     value:String(INV_PRODUCTS.filter(p=>p.urgency==="high").length),    sub:"Restock within 7 days",color:"#fbbf24", bg:"rgba(251,191,36,0.1)",  I:TrendingUp},
          {label:"Total Restock Qty", value:String(INV_PRODUCTS.reduce((a,p)=>a+Math.max(0,p.restock-p.stock),0)), sub:"Units to order", color:"#818cf8", bg:"rgba(129,140,248,0.1)", I:Boxes},
          {label:"Products Monitored",value:String(INV_PRODUCTS.length), sub:"Across all categories", color:"#34d399", bg:"rgba(52,211,153,0.1)", I:PackageCheck},
        ].map((s,i) => (
          <div key={i} className="stat-forecast">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.I size={18} color={s.color}/>
              </div>
              <span style={{fontSize:11,fontWeight:600,color:s.color,background:s.bg,border:`1px solid ${s.color}33`,borderRadius:999,padding:"2px 8px"}}>
                {i===0?"Urgent":i===1?"Soon":i===2?"Total":"Active"}
              </span>
            </div>
            <div style={{fontSize:26,fontWeight:700,color:s.color,marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="fu3 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1.3fr","1fr"),gap:16}}>

        {/* Stock vs Predicted Demand */}
        <div className="card">
          <div className="card-title">
            Stock Level vs Predicted Demand
            <div style={{display:"flex",gap:14,fontSize:11}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#818cf8",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Current Stock</span></span>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#fbbf24",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Demand</span></span>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#fb7185",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Restock Gap</span></span>
            </div>
          </div>
          <div style={{height:260}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockDemandData} margin={{top:8,right:8,left:-10,bottom:44}} barGap={3}>
                <defs>
                  <linearGradient id="stG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="dmD" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="rkG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#e11d48" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:10}} angle={-35} textAnchor="end" interval={0}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <Tooltip content={<TooltipInv/>}/>
                <Bar dataKey="stock"   fill="url(#stG)" radius={[4,4,0,0]} barSize={12}/>
                <Bar dataKey="demand"  fill="url(#dmD)" radius={[4,4,0,0]} barSize={12}/>
                <Bar dataKey="restock" fill="url(#rkG)" radius={[4,4,0,0]} barSize={12}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Products Needing Restock — horizontal bar */}
        <div className="card">
          <div className="card-title">
            Restock Gap by Product
            <span className="badge-r">Action Required</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:4}}>
            {restockGapData.map((p, i) => {
              const u = urgMap[p.urgency] || urgMap.low;
              const pct = Math.min(100, (p.gap / restockGapData[0].gap) * 100);
              return (
                <div key={i}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:500}}>{p.name}</span>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:12,fontWeight:700,color:u.color}}>{p.gap} units</span>
                      <span className={u.chip} style={{fontSize:10,padding:"1px 7px"}}>{u.label}</span>
                    </div>
                  </div>
                  <div style={{height:6,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${u.color},${u.color}88)`,borderRadius:99,transition:"width 0.5s ease",boxShadow:`0 0 8px ${u.color}44`}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Urgency Filter + Full Table ── */}
      <div className="fu4">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.5)"}}>Filter by Urgency:</span>
            <div className="tab-wrap">
              {["All","Critical","High","Medium","Low"].map(u=>(
                <button key={u} onClick={()=>setUrgFilter(u)} className={urgFilter===u?"tab-on":"tab-off"}>{u}</button>
              ))}
            </div>
          </div>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>{filtered.length} products shown</span>
        </div>

        <div className="card" style={{padding:0}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:800}}>
              <thead>
                <tr>
                  {["Product Name","Category","Current Stock","Predicted Demand","Recommended Level","Suggested Restock","Days Left","Urgency"].map(h=>(
                    <th key={h} className="th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const u = urgMap[p.urgency];
                  const reorderQty = Math.max(0, p.restock - p.stock);
                  return (
                    <tr key={p.id} className="tr">
                      <td className="td" style={{textAlign:"left",paddingLeft:20,color:"#e2e8f0",fontWeight:500}}>{p.name}</td>
                      <td className="td"><span className="badge-a" style={{fontSize:10}}>{p.cat}</span></td>
                      <td className="td">
                        <span style={{color: p.stock <= 20 ? "#fb7185" : p.stock <= 50 ? "#fbbf24" : "#34d399", fontWeight:700}}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="td" style={{color:"#fbbf24",fontWeight:600}}>{p.demand}</td>
                      <td className="td" style={{color:"#818cf8",fontWeight:600}}>{p.restock}</td>
                      <td className="td">
                        <span style={{background:"rgba(52,211,153,0.1)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:8,padding:"3px 10px",fontSize:12,fontWeight:700,color:"#6ee7b7"}}>
                          +{reorderQty}
                        </span>
                      </td>
                      <td className="td">
                        <span style={{color: p.daysLeft <= 3 ? "#fb7185" : p.daysLeft <= 7 ? "#fbbf24" : "rgba(255,255,255,0.5)", fontWeight:600, fontSize:12}}>
                          {p.daysLeft <= 3
                            ? `⚠ ${p.daysLeft}d`
                            : `${p.daysLeft} days`}
                        </span>
                      </td>
                      <td className="td">
                        <span className={u.chip}>{u.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Urgent Restock Summary ── */}
      <div className="fu5">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:34,height:34,borderRadius:10,background:"rgba(251,113,133,0.12)",border:"1px solid rgba(251,113,133,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <AlertTriangle size={16} color="#fb7185"/>
          </div>
          <div>
            <h3 style={{fontSize:15,fontWeight:700,color:"#fff"}}>Urgent Restock Required</h3>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:1}}>Products that need immediate attention within 7 days</p>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:14}}>
          {urgent.map(p => {
            const u = urgMap[p.urgency];
            const reorderQty = p.restock - p.stock;
            return (
              <div key={p.id} style={{background:u.bg,border:`1px solid ${u.border}`,borderRadius:14,padding:"18px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:3}}>{p.name}</div>
                    <span className={u.chip} style={{fontSize:10}}>{u.label} Priority</span>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>Days Left</div>
                    <div style={{fontSize:20,fontWeight:700,color:u.color}}>{p.daysLeft}</div>
                  </div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:8,marginBottom:12}}>
                  {[
                    {l:"Current",   v:p.stock,      c:"rgba(255,255,255,0.7)"},
                    {l:"Demand",    v:p.demand,     c:u.color},
                    {l:"Reorder",   v:"+"+reorderQty, c:"#6ee7b7"},
                  ].map(s=>(
                    <div key={s.l} style={{background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"8px",textAlign:"center"}}>
                      <div style={{fontSize:15,fontWeight:700,color:s.c}}>{s.v}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:2}}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Mini stock bar */}
                <div style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:4}}>
                    <span>Stock Level</span>
                    <span>{Math.round(p.stock/p.demand*100)}% of demand</span>
                  </div>
                  <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${Math.min(100,p.stock/p.demand*100)}%`,background:`linear-gradient(90deg,${u.color},${u.color}88)`,borderRadius:99}}/>
                  </div>
                </div>

                <div style={{fontSize:11,color:`${u.color}cc`,background:`${u.color}12`,border:`1px solid ${u.color}25`,borderRadius:8,padding:"6px 10px",lineHeight:1.5}}>
                  ⚠ This product may run out in <strong>{p.daysLeft} {p.daysLeft===1?"day":"days"}</strong>. Recommended restock: <strong>{reorderQty} units</strong>.
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

/* ── PROFIT FORECAST PAGE ─────────────────────────────────────────── */
const ProfitForecast = ({ onBack }: { onBack: () => void }) => {
  const [viewTab, setViewTab] = useState("Monthly");

  const lastMonth  = PROFIT_HISTORY[5]; // Dec
  const nextMonth  = PROFIT_HISTORY[6]; // Jan predicted
  const revenueGrowth = (((nextMonth.revenue  - lastMonth.revenue)  / lastMonth.revenue)  * 100).toFixed(1);
  const expenseGrowth = (((nextMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100).toFixed(1);
  const profitGrowth  = (((nextMonth.profit   - lastMonth.profit)   / lastMonth.profit)   * 100).toFixed(1);

  const insights = [
    {pct:`+${profitGrowth}%`,  color:"#38bdf8", text:`Profit is expected to increase by ${profitGrowth}% compared to last month (Dec), driven by higher predicted sales revenue.`},
    {pct:`+${revenueGrowth}%`, color:"#34d399", text:`Revenue forecast for January is ₱${nextMonth.revenue.toLocaleString()}, a ${revenueGrowth}% jump reflecting continued post-holiday demand growth.`},
    {pct:`+${expenseGrowth}%`, color:"#fbbf24", text:`Expenses are projected to rise ${expenseGrowth}% due to increased supplier orders driven by higher demand forecasts.`},
    {pct:"+46.4%",              color:"#818cf8", text:`March profit forecast (₱${PROFIT_HISTORY[8].profit.toLocaleString()}) shows a 46.4% quarterly improvement vs Q3 average, signaling strong growth momentum.`},
  ];

  const ProfitTT = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
        <div style={{color:"rgba(255,255,255,0.5)",marginBottom:6,fontWeight:600}}>{label}</div>
        {payload.map((p: any) => p.value != null && (
          <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:p.color||p.fill}}/>
            <span style={{color:"rgba(255,255,255,0.55)",textTransform:"capitalize"}}>{p.name}:</span>
            <span style={{color:"#fff",fontWeight:700}}>₱{Number(p.value).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ── Header ── */}
      <div className="fu1" style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <button onClick={onBack} className="btn" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
          <ArrowLeft size={15}/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(56,189,248,0.15)",border:"1px solid rgba(56,189,248,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <DollarSign size={21} color="#38bdf8"/>
          </div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#fff"}}>Profit Forecast</h1>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:2}}>AI-predicted revenue, expenses and net profit based on historical trends</p>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,background:"rgba(56,189,248,0.08)",border:"1px solid rgba(56,189,248,0.2)",borderRadius:10,padding:"6px 14px"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#38bdf8"}} className="pulse"/>
          <span style={{fontSize:12,color:"#7dd3fc",fontWeight:600}}>Model: Active</span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="fu2 grid-4col" style={{display:"grid",gridTemplateColumns:colsW(4),gap:16}}>
        {[
          {label:"Predicted Revenue",  value:`₱${nextMonth.revenue.toLocaleString()}`,  sub:"January 2026",    color:"#34d399", bg:"rgba(52,211,153,0.1)",  I:TrendingUp,  change:`+${revenueGrowth}%`, up:true},
          {label:"Predicted Expenses", value:`₱${nextMonth.expenses.toLocaleString()}`, sub:"January 2026",    color:"#fb7185", bg:"rgba(251,113,133,0.1)", I:Receipt,     change:`+${expenseGrowth}%`, up:false},
          {label:"Predicted Net Profit",value:`₱${nextMonth.profit.toLocaleString()}`,  sub:"January 2026",    color:"#38bdf8", bg:"rgba(56,189,248,0.1)",  I:DollarSign,  change:`+${profitGrowth}%`,  up:true},
          {label:"Profit Margin",      value:`${((nextMonth.profit/nextMonth.revenue)*100).toFixed(1)}%`,  sub:"vs Dec 37.3%", color:"#818cf8", bg:"rgba(129,140,248,0.1)", I:BarChart3, change:"+2.5pp", up:true},
        ].map((s,i)=>(
          <div key={i} className="stat-forecast">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.I size={18} color={s.color}/>
              </div>
              <span className={s.up?"chip-up":"chip-down"}>
                {s.up?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{s.change}
              </span>
            </div>
            <div style={{fontSize:22,fontWeight:700,color:"#fff",marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="fu3 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1.3fr","1fr"),gap:16}}>

        {/* Profit Trend Line Chart */}
        <div className="card">
          <div className="card-title">
            Profit Trend — Historical vs Predicted
            <div style={{display:"flex",gap:14,fontSize:11}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#38bdf8",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Actual</span></span>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:14,height:3,background:"#818cf8",borderRadius:99,opacity:0.7,borderTop:"1px dashed #818cf8"}}/><span style={{color:"rgba(255,255,255,0.45)"}}>Predicted</span></span>
            </div>
          </div>
          <div style={{height:250}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PROFIT_TREND} margin={{top:10,right:12,left:-10,bottom:0}}>
                <defs>
                  <linearGradient id="ptA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<ProfitTT/>}/>
                <ReferenceLine x="Jan" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"
                  label={{value:"Forecast →",position:"insideTopRight",fill:"rgba(255,255,255,0.2)",fontSize:10}}/>
                <Line type="monotone" dataKey="profit"    name="actual"    stroke="#38bdf8" strokeWidth={2.5}
                  dot={{fill:"#38bdf8",r:4,strokeWidth:0}} connectNulls={false}/>
                <Line type="monotone" dataKey="predicted" name="predicted" stroke="#818cf8" strokeWidth={2.5}
                  strokeDasharray="6 3" dot={{fill:"#818cf8",r:4,strokeWidth:0}} connectNulls={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue vs Expenses Bar Chart */}
        <div className="card">
          <div className="card-title">
            Revenue vs Expenses
            <div className="tab-wrap">
              {["Monthly","Quarterly"].map(t=>(
                <button key={t} onClick={()=>setViewTab(t)} className={viewTab===t?"tab-on":"tab-off"}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{height:250}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={viewTab==="Monthly" ? PROFIT_HISTORY.slice(-5) : [
                  {month:"Q3 2025",revenue:925000,expenses:593000,profit:332000,predicted:false},
                  {month:"Q4 2025",revenue:1150067,expenses:717066,profit:433001,predicted:false},
                  {month:"Q1 2026",revenue:1575000,expenses:915000,profit:660000,predicted:true},
                ]}
                margin={{top:8,right:8,left:-10,bottom:0}} barGap={4}>
                <defs>
                  <linearGradient id="rvG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="exG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#e11d48" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="prG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#0284c7" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:10}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<ProfitTT/>}/>
                <Bar dataKey="revenue"  name="revenue"  fill="url(#rvG)" radius={[5,5,0,0]} barSize={16}/>
                <Bar dataKey="expenses" name="expenses" fill="url(#exG)" radius={[5,5,0,0]} barSize={16}/>
                <Bar dataKey="profit"   name="profit"   fill="url(#prG)" radius={[5,5,0,0]} barSize={16}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",gap:16,marginTop:10,flexWrap:"wrap"}}>
            {[{c:"#34d399",l:"Revenue"},{c:"#fb7185",l:"Expenses"},{c:"#38bdf8",l:"Net Profit"}].map(x=>(
              <span key={x.l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"rgba(255,255,255,0.4)"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:x.c}}/>{x.l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Last Month vs Next Month Comparison + AI Insights ── */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>

        {/* Comparison Table */}
        <div className="card">
          <div className="card-title">Last Month vs Predicted Next Month</div>
          <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:12,marginBottom:20}}>
            {[
              {label:"Revenue",  last:lastMonth.revenue,  next:nextMonth.revenue,  color:"#34d399"},
              {label:"Expenses", last:lastMonth.expenses, next:nextMonth.expenses, color:"#fb7185"},
              {label:"Profit",   last:lastMonth.profit,   next:nextMonth.profit,   color:"#38bdf8"},
            ].map(c=>{
              const g = (((c.next-c.last)/c.last)*100).toFixed(1);
              const up = +g > 0;
              return (
                <div key={c.label} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:8,fontWeight:600,letterSpacing:"0.04em"}}>{c.label.toUpperCase()}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:4}}>Dec: ₱{(c.last/1000).toFixed(0)}k</div>
                  <div style={{fontSize:18,fontWeight:700,color:c.color,marginBottom:6}}>₱{(c.next/1000).toFixed(0)}k</div>
                  <span className={up?"chip-up":"chip-down"}>
                    {up?<TrendingUp size={9}/>:<TrendingDown size={9}/>}{up?"+":""}{g}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Month-by-month table */}
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr>
                {["Month","Revenue","Expenses","Net Profit","Margin","Status"].map(h=>(
                  <th key={h} className="th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROFIT_HISTORY.slice(-5).map((r,i)=>{
                const margin = ((r.profit/r.revenue)*100).toFixed(1);
                return (
                  <tr key={i} className="tr">
                    <td className="td" style={{color:"rgba(255,255,255,0.7)",fontWeight:600}}>{r.month}</td>
                    <td className="td" style={{color:"#34d399",fontWeight:600}}>₱{r.revenue.toLocaleString()}</td>
                    <td className="td" style={{color:"#fda4af"}}>₱{r.expenses.toLocaleString()}</td>
                    <td className="td" style={{color:"#38bdf8",fontWeight:700}}>₱{r.profit.toLocaleString()}</td>
                    <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>{margin}%</td>
                    <td className="td">
                      <span className={r.predicted?"badge-v":"badge-g"} style={{fontSize:10}}>
                        {r.predicted?"Predicted":"Actual"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI Insights */}
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Sparkles size={15} color="#38bdf8"/>
              AI Profit Insights
            </div>
          </div>

          {/* Big featured insight */}
          <div style={{
            background:"linear-gradient(135deg,rgba(56,189,248,0.12),rgba(129,140,248,0.06))",
            border:"1px solid rgba(56,189,248,0.25)",borderRadius:14,padding:"18px 20px",marginBottom:16,
          }}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:40,height:40,borderRadius:10,background:"rgba(56,189,248,0.15)",border:"1px solid rgba(56,189,248,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <DollarSign size={20} color="#38bdf8"/>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>Primary Forecast</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>High confidence · Based on 6 months of data</div>
              </div>
              <span className="chip-up" style={{marginLeft:"auto"}}><TrendingUp size={10}/>+{profitGrowth}%</span>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.75)",lineHeight:1.7,fontStyle:"italic"}}>
              "Profit is expected to increase by <span style={{color:"#38bdf8",fontWeight:700}}>{profitGrowth}%</span> compared to the previous month (December), with net profit reaching <span style={{color:"#38bdf8",fontWeight:700}}>₱{nextMonth.profit.toLocaleString()}</span> in January 2026."
            </p>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {insights.map((ins,i)=>(
              <div key={i} style={{
                background:`${ins.color}0d`,border:`1px solid ${ins.color}28`,
                borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start",
                transition:"border-color 0.15s",
              }}>
                <div style={{minWidth:44,height:44,borderRadius:10,background:`${ins.color}15`,border:`1px solid ${ins.color}30`,
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:11,fontWeight:700,color:ins.color}}>{ins.pct}</span>
                  <TrendingUp size={11} color={ins.color} style={{marginTop:1}}/>
                </div>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.6}}>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3-Month Forecast Summary ── */}
      <div className="fu5 grid-3col" style={{display:"grid",gridTemplateColumns:colsW(3),gap:16}}>
        {PROFIT_HISTORY.slice(6).map((m,i)=>{
          const prev = PROFIT_HISTORY[5+i];
          const revG = (((m.revenue-prev.revenue)/prev.revenue)*100).toFixed(1);
          const proG = (((m.profit-prev.profit)/prev.profit)*100).toFixed(1);
          const margin = ((m.profit/m.revenue)*100).toFixed(1);
          return (
            <div key={i} style={{
              background:"linear-gradient(135deg,rgba(56,189,248,0.07),rgba(129,140,248,0.04))",
              border:"1px solid rgba(56,189,248,0.18)",borderRadius:14,padding:"20px 22px",
            }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:2}}>
                    {m.month} 2026 Forecast
                  </div>
                  <span className="badge-v" style={{fontSize:10}}>Predicted</span>
                </div>
                <span className="chip-up"><TrendingUp size={10}/>+{proG}%</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:10,marginBottom:14}}>
                {[
                  {l:"Revenue",  v:`₱${(m.revenue/1000).toFixed(0)}k`,  c:"#34d399"},
                  {l:"Expenses", v:`₱${(m.expenses/1000).toFixed(0)}k`, c:"#fb7185"},
                  {l:"Profit",   v:`₱${(m.profit/1000).toFixed(0)}k`,   c:"#38bdf8"},
                ].map(s=>(
                  <div key={s.l} style={{textAlign:"center",background:"rgba(0,0,0,0.2)",borderRadius:8,padding:"8px 4px"}}>
                    <div style={{fontSize:15,fontWeight:700,color:s.c}}>{s.v}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.28)",marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:6}}>
                <span>Profit Margin</span><span style={{color:"#38bdf8",fontWeight:600}}>{margin}%</span>
              </div>
              <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${margin}%`,background:"linear-gradient(90deg,#38bdf8,#818cf8)",borderRadius:99}}/>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

/* ── EXPENSE PREDICTION PAGE ──────────────────────────────────────── */
const ExpensePrediction = ({ onBack }: { onBack: () => void }) => {
  const [barRange, setBarRange] = useState("6 Months");

  const lastMonth  = EXP_HISTORY[4]; // Dec
  const nextMonth  = EXP_HISTORY[5]; // Jan (predicted)

  const total = (r: typeof EXP_HISTORY[0]) =>
    r.rent + r.salaries + r.utilities + r.supplies + r.other;

  const lastTotal = total(lastMonth);
  const nextTotal = total(nextMonth);
  const totalGrowth = (((nextTotal - lastTotal) / lastTotal) * 100).toFixed(1);

  // Pie data for next month
  const pieExpData = EXP_CATEGORIES.map(c => ({
    name: c.label,
    value: (nextMonth as any)[c.key],
    color: c.color,
  }));

  // Bar chart data
  const barData6 = EXP_HISTORY.map(r => {
    const obj: any = {month: r.month, predicted: r.predicted};
    EXP_CATEGORIES.forEach(c => { obj[c.label] = (r as any)[c.key]; });
    return obj;
  });
  const barData3 = barData6.slice(-3);
  const barDataShown = barRange === "6 Months" ? barData6 : barData3;

  // Custom pie label
  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    if (percent < 0.07) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
        style={{fontSize:11,fontWeight:700,pointerEvents:"none"}}>
        {(percent*100).toFixed(0)}%
      </text>
    );
  };

  const ExpTT = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
        <div style={{color:"rgba(255,255,255,0.5)",marginBottom:6,fontWeight:600}}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:p.fill}}/>
            <span style={{color:"rgba(255,255,255,0.55)"}}>{p.name}:</span>
            <span style={{color:"#fff",fontWeight:700}}>₱{Number(p.value).toLocaleString()}</span>
          </div>
        ))}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:6,paddingTop:6,color:"#fff",fontWeight:700}}>
          Total: ₱{payload.reduce((s:number,p:any)=>s+p.value,0).toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ── Header ── */}
      <div className="fu1" style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <button onClick={onBack} className="btn" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
          <ArrowLeft size={15}/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"rgba(251,113,133,0.15)",border:"1px solid rgba(251,113,133,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Receipt size={20} color="#fb7185"/>
          </div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#fff"}}>Expense Prediction</h1>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:2}}>AI-estimated future expenses based on historical spending patterns</p>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,background:"rgba(251,113,133,0.08)",border:"1px solid rgba(251,113,133,0.2)",borderRadius:10,padding:"6px 14px"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#fb7185"}} className="pulse"/>
          <span style={{fontSize:12,color:"#fda4af",fontWeight:600}}>Model: Active</span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="fu2 grid-5col" style={{display:"grid",gridTemplateColumns:colsW(5),gap:14}}>
        {EXP_CATEGORIES.map(c => {
          const prev = (lastMonth as any)[c.key];
          const next = (nextMonth as any)[c.key];
          const chg  = (((next-prev)/prev)*100).toFixed(1);
          const up   = +chg >= 0;
          return (
            <div key={c.key} className="stat-forecast" style={{borderColor:c.border}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{width:34,height:34,borderRadius:10,background:c.light,border:`1px solid ${c.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <Receipt size={16} color={c.color}/>
                </div>
                <span className={up?"chip-down":"chip-up"} style={{fontSize:10}}>
                  {up?<TrendingUp size={9}/>:<TrendingDown size={9}/>}{up?"+":""}{chg}%
                </span>
              </div>
              <div style={{fontSize:19,fontWeight:700,color:c.color,marginBottom:3}}>
                ₱{next.toLocaleString()}
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500,marginBottom:1}}>{c.label}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.2)"}}>Dec: ₱{prev.toLocaleString()}</div>
            </div>
          );
        })}
      </div>

      {/* ── Total + vs last month ── */}
      <div className="fu2 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1fr","2fr"),gap:16}}>

        {/* Total next month */}
        <div style={{background:"linear-gradient(135deg,rgba(251,113,133,0.1),rgba(251,113,133,0.04))",border:"1px solid rgba(251,113,133,0.22)",borderRadius:16,padding:"22px 24px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.35)",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:6}}>Total Estimated Expenses</div>
            <div style={{fontSize:36,fontWeight:700,color:"#fb7185",marginBottom:4}}>₱{nextTotal.toLocaleString()}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>January 2026 · All categories</div>
          </div>
          <div style={{marginTop:18}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:6}}>
              <span>vs December 2025</span>
              <span style={{color:+totalGrowth>0?"#fb7185":"#34d399",fontWeight:700}}>
                {+totalGrowth>0?"+":""}{totalGrowth}%
              </span>
            </div>
            <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${Math.min(100,Math.abs(+totalGrowth)*8)}%`,background:"linear-gradient(90deg,#fb7185,#fda4af88)",borderRadius:99}}/>
            </div>
            <div style={{marginTop:12,display:"flex",gap:8}}>
              <div style={{flex:1,textAlign:"center",background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"8px 4px"}}>
                <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.6)"}}>₱{lastTotal.toLocaleString()}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:2}}>Last Month</div>
              </div>
              <div style={{flex:1,textAlign:"center",background:"rgba(251,113,133,0.08)",border:"1px solid rgba(251,113,133,0.15)",borderRadius:8,padding:"8px 4px"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fb7185"}}>₱{nextTotal.toLocaleString()}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:2}}>Predicted</div>
              </div>
            </div>
          </div>
        </div>

        {/* Last vs next breakdown */}
        <div className="card">
          <div className="card-title">December 2025 vs January 2026 — Category Breakdown</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {EXP_CATEGORIES.map(c => {
              const prev = (lastMonth as any)[c.key];
              const next = (nextMonth as any)[c.key];
              const chg  = (((next-prev)/prev)*100).toFixed(1);
              const maxVal = Math.max(lastTotal, nextTotal);
              return (
                <div key={c.key}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:9,height:9,borderRadius:"50%",background:c.color,flexShrink:0}}/>
                      <span style={{fontSize:12,color:"rgba(255,255,255,0.65)",fontWeight:500,width:130}}>{c.label}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:14}}>
                      <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",width:80,textAlign:"right"}}>₱{prev.toLocaleString()}</span>
                      <span style={{fontSize:12,fontWeight:700,color:c.color,width:80,textAlign:"right"}}>₱{next.toLocaleString()}</span>
                      <span className={+chg>0?"chip-down":"chip-up"} style={{fontSize:10,minWidth:52,justifyContent:"center"}}>
                        {+chg>0?<TrendingUp size={9}/>:<TrendingDown size={9}/>}{+chg>0?"+":""}{chg}%
                      </span>
                    </div>
                  </div>
                  <div style={{position:"relative",height:5,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${(prev/maxVal)*100}%`,background:"rgba(255,255,255,0.12)",borderRadius:99}}/>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${(next/maxVal)*100}%`,background:c.color,borderRadius:99,opacity:0.7}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Charts ── */}
      <div className="fu3 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1fr","1.6fr"),gap:16}}>

        {/* Pie chart — expense distribution */}
        <div className="card">
          <div className="card-title">
            Expense Distribution — January 2026
            <span className="badge-r">Predicted</span>
          </div>
          <div style={{height:220,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieExpData}
                  cx="50%" cy="50%"
                  innerRadius={52} outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                  labelLine={false}
                  label={renderPieLabel}
                >
                  {pieExpData.map((e,i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip content={({active,payload})=>{
                  if(!active||!payload?.length)return null;
                  const p=payload[0];
                  const pct=(((p.value as number)/nextTotal)*100).toFixed(1);
                  return(
                    <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
                      <div style={{color:(p.payload as any).color,fontWeight:700,marginBottom:4}}>{p.name}</div>
                      <div style={{color:"#fff",fontWeight:700}}>₱{Number(p.value).toLocaleString()}</div>
                      <div style={{color:"rgba(255,255,255,0.4)",marginTop:2}}>{pct}% of total</div>
                    </div>
                  );
                }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {pieExpData.map((e,i) => {
              const pct = ((e.value/nextTotal)*100).toFixed(1);
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:10,height:10,borderRadius:3,background:e.color,flexShrink:0}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.55)",flex:1}}>{e.name}</span>
                  <span style={{fontSize:11,fontWeight:700,color:e.color}}>₱{e.value.toLocaleString()}</span>
                  <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",width:36,textAlign:"right"}}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stacked bar chart — monthly expenses */}
        <div className="card">
          <div className="card-title">
            Predicted Monthly Expenses by Category
            <div className="tab-wrap">
              {["6 Months","3 Months"].map(t=>(
                <button key={t} onClick={()=>setBarRange(t)} className={barRange===t?"tab-on":"tab-off"}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{height:300}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barDataShown} margin={{top:8,right:8,left:-10,bottom:0}}>
                <defs>
                  {EXP_CATEGORIES.map(c=>(
                    <linearGradient key={c.key} id={`eg_${c.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c.color} stopOpacity={1}/>
                      <stop offset="100%" stopColor={c.color} stopOpacity={0.55}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="month" axisLine={false} tickLine={false}
                  tick={({x,y,payload})=>(
                    <g transform={`translate(${x},${y})`}>
                      <text x={0} y={0} dy={14} textAnchor="middle"
                        fill={barDataShown.find(d=>d.month===payload.value)?.predicted?"#818cf8":"rgba(255,255,255,0.28)"}
                        fontSize={11}>
                        {payload.value}{barDataShown.find(d=>d.month===payload.value)?.predicted?" ✦":""}
                      </text>
                    </g>
                  )}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<ExpTT/>}/>
                {EXP_CATEGORIES.map(c=>(
                  <Bar key={c.key} dataKey={c.label} name={c.label}
                    stackId="exp" fill={`url(#eg_${c.key})`}
                    radius={c.key==="other"?[4,4,0,0]:[0,0,0,0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:8}}>
            {EXP_CATEGORIES.map(c=>(
              <span key={c.key} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"rgba(255,255,255,0.4)"}}>
                <div style={{width:9,height:9,borderRadius:2,background:c.color}}/>
                {c.label}
              </span>
            ))}
            <span style={{fontSize:11,color:"rgba(129,140,248,0.7)",marginLeft:"auto"}}>✦ Predicted months</span>
          </div>
        </div>
      </div>

      {/* ── AI Insights ── */}
      <div className="fu4">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{width:34,height:34,borderRadius:10,background:"rgba(251,113,133,0.12)",border:"1px solid rgba(251,113,133,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Sparkles size={16} color="#fb7185"/>
          </div>
          <div>
            <h3 style={{fontSize:15,fontWeight:700,color:"#fff"}}>AI Expense Insights</h3>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:1}}>Category-level predictions and cost-saving recommendations</p>
          </div>
        </div>

        {/* Featured insight */}
        <div style={{background:"linear-gradient(135deg,rgba(251,113,133,0.1),rgba(251,113,133,0.03))",border:"1px solid rgba(251,113,133,0.25)",borderRadius:14,padding:"18px 22px",marginBottom:16,display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{width:52,height:52,borderRadius:12,background:"rgba(251,113,133,0.15)",border:"1px solid rgba(251,113,133,0.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Receipt size={24} color="#fb7185"/>
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>Primary Forecast</span>
              <span className="badge-r" style={{fontSize:10}}>January 2026</span>
              <span className="chip-down" style={{marginLeft:"auto"}}><TrendingUp size={10}/>+{totalGrowth}%</span>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.7)",lineHeight:1.7,fontStyle:"italic"}}>
              "Total expenses are projected to reach <span style={{color:"#fb7185",fontWeight:700}}>₱{nextTotal.toLocaleString()}</span> in January 2026,
              an increase of <span style={{color:"#fb7185",fontWeight:700}}>{totalGrowth}%</span> compared to December 2025.
              The main drivers are rising salary costs and higher utility usage due to seasonal demand."
            </p>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
          {EXP_INSIGHTS.map((ins,i)=>(
            <div key={i} style={{
              background:`${ins.color}0d`,border:`1px solid ${ins.color}28`,
              borderRadius:13,padding:"14px 18px",display:"flex",gap:14,alignItems:"flex-start",
            }}>
              <div style={{width:48,height:48,borderRadius:11,background:`${ins.color}15`,border:`1px solid ${ins.color}30`,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,gap:2}}>
                <span style={{fontSize:15}}>{ins.icon}</span>
                <span style={{fontSize:10,fontWeight:700,color:ins.color}}>{ins.pct}</span>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:4}}>
                  <span style={{color:ins.color}}>{ins.cat}</span> Prediction
                </div>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>{ins.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3-month forecast table ── */}
      <div className="fu5">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:34,height:34,borderRadius:10,background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <BarChart3 size={16} color="#38bdf8"/>
          </div>
          <h3 style={{fontSize:15,fontWeight:700,color:"#fff"}}>3-Month Expense Forecast</h3>
        </div>
        <div className="card" style={{padding:0}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
              <thead>
                <tr>
                  <th className="th" style={{textAlign:"left",paddingLeft:20}}>Month</th>
                  {EXP_CATEGORIES.map(c=><th key={c.key} className="th" style={{color:c.color}}>{c.label}</th>)}
                  <th className="th">Total</th>
                  <th className="th">vs Prev</th>
                  <th className="th">Status</th>
                </tr>
              </thead>
              <tbody>
                {EXP_HISTORY.map((r,i)=>{
                  const t = total(r);
                  const prev = i > 0 ? total(EXP_HISTORY[i-1]) : null;
                  const chg = prev ? (((t-prev)/prev)*100).toFixed(1) : null;
                  return (
                    <tr key={i} className="tr">
                      <td className="td" style={{textAlign:"left",paddingLeft:20,color:"rgba(255,255,255,0.75)",fontWeight:600}}>
                        {r.month} {r.predicted && <span style={{fontSize:10,color:"#818cf8"}}>2026</span>}
                      </td>
                      {EXP_CATEGORIES.map(c=>(
                        <td key={c.key} className="td" style={{color:c.color,fontWeight:r.predicted?700:400}}>
                          ₱{(r as any)[c.key].toLocaleString()}
                        </td>
                      ))}
                      <td className="td" style={{color:r.predicted?"#fda4af":"rgba(255,255,255,0.6)",fontWeight:r.predicted?700:500}}>
                        ₱{t.toLocaleString()}
                      </td>
                      <td className="td">
                        {chg
                          ? <span className={+chg>0?"chip-down":"chip-up"}>
                              {+chg>0?<TrendingUp size={9}/>:<TrendingDown size={9}/>}{+chg>0?"+":""}{chg}%
                            </span>
                          : <span style={{color:"rgba(255,255,255,0.2)",fontSize:11}}>—</span>}
                      </td>
                      <td className="td">
                        <span className={r.predicted?"badge-v":"badge-g"} style={{fontSize:10}}>
                          {r.predicted?"Predicted":"Actual"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

/* ── CUSTOMER BEHAVIOR PREDICTION ────────────────────────────────── */
const CustomerBehavior = ({ onBack }: { onBack: () => void }) => {
  const [filter, setFilter] = useState<"daily"|"weekly"|"monthly">("daily");

  const heatmap   = filter==="daily" ? HEATMAP_DAILY : filter==="weekly" ? HEATMAP_WEEKLY : HEATMAP_MONTHLY;
  const products  = filter==="daily" ? TOP_PRODUCTS_DAILY : filter==="weekly" ? TOP_PRODUCTS_WEEKLY : TOP_PRODUCTS_MONTHLY;
  const peaks     = filter==="daily" ? PEAK_HOURS_DAILY : filter==="weekly" ? PEAK_HOURS_WEEKLY : PEAK_HOURS_MONTHLY;

  // Heat colour: 0=transparent → violet → purple → pink
  const heatColor = (v: number) => {
    if (v === 0)  return "rgba(255,255,255,0.02)";
    if (v < 20)   return `rgba(129,140,248,${(v/20)*0.25})`;
    if (v < 50)   return `rgba(167,139,250,${0.25+(v-20)/30*0.35})`;
    if (v < 80)   return `rgba(251,113,133,${0.45+(v-50)/30*0.35})`;
    return `rgba(251,113,133,${0.75+(v-80)/20*0.25})`;
  };

  const tierColor: Record<string,string> = {
    Platinum:"#e2e8f0", Gold:"#fbbf24", Silver:"#94a3b8", Bronze:"#fb7185",
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ── Header ── */}
      <div className="fu1" style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
        <button onClick={onBack} className="btn" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px"}}>
          <ArrowLeft size={15}/> Back
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,
            background:"linear-gradient(135deg,rgba(167,139,250,0.2),rgba(129,140,248,0.12))",
            border:"1px solid rgba(167,139,250,0.3)",
            display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Users size={20} color="#a78bfa"/>
          </div>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,color:"#fff"}}>Customer Behavior Prediction</h1>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:2}}>AI-driven insights into purchasing patterns and customer loyalty</p>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8,
          background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.22)",borderRadius:10,padding:"6px 14px"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#a78bfa"}} className="pulse"/>
          <span style={{fontSize:12,color:"#c4b5fd",fontWeight:600}}>Model: Active</span>
        </div>
      </div>

      {/* ── Filter ── */}
      <div className="fu2" style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontWeight:600,letterSpacing:"0.05em"}}>VIEW BEHAVIOR BY</span>
        <div className="tab-wrap">
          {(["daily","weekly","monthly"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={filter===f?"tab-on":"tab-off"} style={{textTransform:"capitalize"}}>{f}</button>
          ))}
        </div>
        <div style={{marginLeft:"auto",fontSize:12,color:"rgba(255,255,255,0.25)"}}>
          Showing: <span style={{color:"#a78bfa",fontWeight:600,textTransform:"capitalize"}}>{filter}</span> patterns
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="fu2 grid-4col" style={{display:"grid",gridTemplateColumns:colsW(4),gap:16}}>
        {[
          {label:"Peak Shopping Hour",  value: peaks[0].label.split("–")[0].trim(), sub:`${filter} peak window`, color:"#a78bfa", bg:"rgba(167,139,250,0.1)", I:Users},
          {label:"Top Product",         value:"Coca-Cola 1.5L",        sub:`#1 most purchased`,       color:"#34d399", bg:"rgba(52,211,153,0.1)",  I:Package},
          {label:"Loyal Customers",     value:"7 VIPs",                sub:"Active loyalty members",  color:"#fbbf24", bg:"rgba(251,191,36,0.1)",  I:Star},
          {label:"Top Basket Combo",    value:"Cola + Chippy",         sub:"68% co-purchase rate",    color:"#38bdf8", bg:"rgba(56,189,248,0.1)",  I:Sparkles},
        ].map((s,i)=>(
          <div key={i} className="stat-forecast" style={{borderColor:`${s.color}22`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.I size={17} color={s.color}/>
              </div>
              <span className="chip-up"><TrendingUp size={9}/> Active</span>
            </div>
            <div style={{fontSize:17,fontWeight:700,color:"#fff",marginBottom:3,lineHeight:1.3}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Heatmap (full width) ── */}
      <div className="fu3 card" style={{padding:"20px 20px 16px"}}>
        {/* Card header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:9,background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <BarChart3 size={15} color="#a78bfa"/>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.7)"}}>Purchase Activity Heatmap</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:1}}>Activity intensity by day &amp; hour · hover a cell for details</div>
            </div>
          </div>
          {/* Gradient legend */}
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Low</span>
            <div style={{width:120,height:10,borderRadius:99,background:"linear-gradient(90deg,rgba(129,140,248,0.15),rgba(167,139,250,0.5),rgba(251,113,133,0.65),rgba(251,113,133,0.97))",border:"1px solid rgba(255,255,255,0.06)"}}/>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>High</span>
          </div>
        </div>

        {/* Hour axis labels — all 24, evenly spaced */}
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch" as any}}>
        <div style={{minWidth:600}}>
        <div style={{display:"grid",gridTemplateColumns:"40px repeat(24,1fr)",gap:3,marginBottom:4}}>
          <div/>
          {HOURS.map((h,i)=>(
            <div key={i} style={{fontSize:9,color:i%2===0?"rgba(255,255,255,0.3)":"transparent",textAlign:"center",userSelect:"none"}}>{h}</div>
          ))}
        </div>

        {/* Heatmap rows — cells stretch to fill full width via grid */}
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          {DAYS.map((day,di)=>(
            <div key={day} style={{display:"grid",gridTemplateColumns:"40px repeat(24,1fr)",gap:3,alignItems:"center"}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:600,textAlign:"right",paddingRight:8,userSelect:"none"}}>{day}</div>
              {heatmap[di].map((v,hi)=>(
                <div key={hi} className="hcell"
                  style={{
                    height:28, borderRadius:4,
                    background: heatColor(v),
                    border:`1px solid rgba(255,255,255,${v>40?0.05:0.025})`,
                    animationDelay:`${(di*24+hi)*3}ms`,
                    cursor:"default",
                    transition:"transform 0.12s, filter 0.12s",
                    position:"relative",
                  }}
                  title={`${day} ${HOURS[hi]} — ${v}% activity`}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="scale(1.18)";(e.currentTarget as HTMLDivElement).style.filter="brightness(1.4)";(e.currentTarget as HTMLDivElement).style.zIndex="10";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="";(e.currentTarget as HTMLDivElement).style.filter="";(e.currentTarget as HTMLDivElement).style.zIndex="";}}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Hourly sparkline summary — average activity per hour across all days */}
        <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginBottom:8,fontWeight:600,letterSpacing:"0.05em"}}>HOURLY AVERAGE ACROSS ALL DAYS</div>
          <div style={{display:"grid",gridTemplateColumns:"40px repeat(24,1fr)",gap:3,alignItems:"flex-end"}}>
            <div/>
            {HOURS.map((_,hi)=>{
              const avg = Math.round(heatmap.reduce((s,row)=>s+row[hi],0)/DAYS.length);
              const maxAvg = 80;
              const h = Math.max(3, Math.round((avg/maxAvg)*40));
              const col = avg<20?"rgba(129,140,248,0.4)":avg<50?"rgba(167,139,250,0.65)":avg<75?"rgba(251,113,133,0.75)":"rgba(251,113,133,1)";
              return (
                <div key={hi} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                  <div style={{
                    width:"100%", height:h, borderRadius:"3px 3px 0 0",
                    background:col,
                    boxShadow:avg>60?`0 0 6px ${col}88`:"none",
                    transition:"height 0.4s ease",
                  }}/>
                </div>
              );
            })}
          </div>
        </div>
        </div>{/* end minWidth */}
        </div>{/* end heatmap scroll */}

        {/* Peak callout strips */}
        <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:10,marginTop:14}}>
          {peaks.map((p,i)=>{
            const colors=["#fb7185","#fbbf24","#a78bfa"];
            const c=colors[i];
            const labels=["🔴 Busiest","🟡 2nd Peak","🟣 3rd Peak"];
            return (
              <div key={i} style={{background:`${c}0d`,border:`1px solid ${c}22`,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:`${c}cc`,fontWeight:700,letterSpacing:"0.05em",marginBottom:3}}>{labels[i]}</div>
                  <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{p.label}</div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:18,fontWeight:800,color:c,lineHeight:1}}>{p.intensity}%</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.25)"}}>activity</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Peak breakdown + Bought Together (below heatmap) ── */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1.2fr","1fr"),gap:16}}>

        {/* Day-of-week activity summary */}
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#a78bfa"}} className="pulse"/>
              Activity by Day of Week
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {DAYS.map((day,di)=>{
              const avg = Math.round(heatmap[di].reduce((s,v)=>s+v,0)/24);
              const max = 60;
              const pct = Math.min(100,(avg/max)*100);
              const c = avg<20?"#818cf8":avg<35?"#a78bfa":avg<50?"#fbbf24":"#fb7185";
              const label = avg<20?"Low":avg<35?"Moderate":avg<50?"High":"Very High";
              return (
                <div key={day}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.65)",fontWeight:600,width:36}}>{day}</span>
                    <div style={{flex:1,margin:"0 12px",height:8,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden",position:"relative"}}>
                      <div style={{position:"absolute",inset:0,height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${c},${c}88)`,borderRadius:99,boxShadow:`0 0 8px ${c}44`,transition:"width 0.5s ease"}}/>
                      <div className="shimmer-bar" style={{position:"absolute",inset:0,borderRadius:99}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:c,width:62,textAlign:"right"}}>{avg}% · {label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products Bought Together */}
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <Sparkles size={13} color="#a78bfa"/>
              Frequently Bought Together
            </div>
            <span className="badge-v" style={{fontSize:10}}>Co-purchase %</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>
            {BOUGHT_TOGETHER.map((bt,i)=>(
              <div key={i} style={{background:`${bt.color}08`,border:`1px solid ${bt.color}20`,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.75)"}}>{bt.a}</span>
                    <div style={{width:18,height:18,borderRadius:"50%",background:`${bt.color}18`,border:`1px solid ${bt.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:bt.color,fontWeight:700,flexShrink:0}}>+</div>
                    <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.75)"}}>{bt.b}</span>
                  </div>
                  <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${bt.freq}%`,background:`linear-gradient(90deg,${bt.color},${bt.color}88)`,borderRadius:99}}/>
                  </div>
                </div>
                <div style={{textAlign:"center",minWidth:42}}>
                  <div style={{fontSize:17,fontWeight:800,color:bt.color,lineHeight:1}}>{bt.freq}%</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.25)",marginTop:2}}>rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bar Chart + Loyalty Table ── */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1fr","1.1fr"),gap:16}}>

        {/* Most Purchased Bar Chart */}
        <div className="card">
          <div className="card-title">
            Most Frequently Purchased Products
            <span className="badge-v" style={{fontSize:10,textTransform:"capitalize"}}>{filter}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:11,marginTop:4}}>
            {products.map((p,i)=>{
              const max = products[0].qty;
              const pct = (p.qty / max) * 100;
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.3)",width:16,textAlign:"right",fontWeight:600}}>{i+1}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:500}}>{p.name}</span>
                      <span style={{fontSize:12,fontWeight:700,color:p.color}}>{p.qty.toLocaleString()} sold</span>
                    </div>
                    <div style={{height:7,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden",position:"relative"}}>
                      <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${p.color},${p.color}88)`,
                        borderRadius:99,boxShadow:`0 0 8px ${p.color}44`,transition:"width 0.5s ease"}}/>
                      {/* shimmer overlay */}
                      <div className="shimmer-bar" style={{position:"absolute",inset:0,borderRadius:99}}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Loyalty Ranking */}
        <div className="card" style={{padding:0}}>
          <div style={{padding:"16px 20px 12px"}}>
            <div className="card-title" style={{marginBottom:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <Star size={14} color="#fbbf24" fill="#fbbf24"/>
                Customer Loyalty Ranking
              </div>
              <span className="badge-a" style={{fontSize:10}}>Top {LOYAL_CUSTOMERS.length}</span>
            </div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr>
                  <th className="th" style={{paddingLeft:20,textAlign:"left"}}>Rank</th>
                  <th className="th" style={{textAlign:"left"}}>Customer</th>
                  <th className="th">Visits</th>
                  <th className="th">Total Spent</th>
                  <th className="th">Avg/Order</th>
                  <th className="th">Tier</th>
                </tr>
              </thead>
              <tbody>
                {LOYAL_CUSTOMERS.map((c,i)=>{
                  const tc = tierColor[c.tier];
                  const isTop3 = i < 3;
                  return (
                    <tr key={i} className="tr" style={{background:isTop3?`rgba(167,139,250,0.03)`:undefined}}>
                      <td className="td" style={{paddingLeft:20,fontSize:18}}>
                        {isTop3 ? c.badge : <span style={{fontSize:12,color:"rgba(255,255,255,0.3)",fontWeight:600}}>{c.rank}</span>}
                      </td>
                      <td className="td" style={{textAlign:"left"}}>
                        <div style={{fontSize:13,fontWeight:600,color:isTop3?"#fff":"rgba(255,255,255,0.7)"}}>{c.name}</div>
                      </td>
                      <td className="td" style={{color:"#a78bfa",fontWeight:600}}>{c.visits}x</td>
                      <td className="td" style={{color:"#34d399",fontWeight:700}}>₱{c.totalSpent.toLocaleString()}</td>
                      <td className="td" style={{color:"rgba(255,255,255,0.5)"}}>₱{c.avgOrder.toLocaleString()}</td>
                      <td className="td">
                        <span style={{
                          background:`${tc}18`,border:`1px solid ${tc}44`,color:tc,
                          borderRadius:999,padding:"2px 10px",fontSize:11,fontWeight:700,
                        }}>{c.tier}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── AI Insights ── */}
      <div className="fu5">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{width:34,height:34,borderRadius:10,
            background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.22)",
            display:"flex",alignItems:"center",justifyContent:"center"}}>
            <BrainCircuit size={16} color="#a78bfa"/>
          </div>
          <div>
            <h3 style={{fontSize:15,fontWeight:700,color:"#fff"}}>AI Behavioral Insights</h3>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:1}}>Pattern-based recommendations to grow revenue and customer satisfaction</p>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
          {CB_INSIGHTS.map((ins,i)=>(
            <div key={i} style={{
              background:`linear-gradient(135deg,${ins.color}0d,${ins.color}05)`,
              border:`1px solid ${ins.color}28`,borderRadius:14,padding:"18px 20px",
              display:"flex",gap:14,alignItems:"flex-start",
              transition:"border-color 0.2s, transform 0.2s",
              cursor:"default",
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${ins.color}55`;(e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${ins.color}28`;(e.currentTarget as HTMLDivElement).style.transform="none";}}
            >
              <div style={{width:52,height:52,borderRadius:12,
                background:`${ins.color}15`,border:`1px solid ${ins.color}30`,
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                flexShrink:0,gap:3}}>
                <span style={{fontSize:18}}>{ins.icon}</span>
                <span style={{fontSize:9,fontWeight:700,color:ins.color,letterSpacing:"0.02em"}}>{ins.pct}</span>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:5}}>
                  <span style={{color:ins.color}}>{ins.title}</span>
                </div>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.65}}>{ins.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bought Together Detail ── */}
      <div className="fu6">
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:34,height:34,borderRadius:10,
            background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.2)",
            display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Sparkles size={16} color="#38bdf8"/>
          </div>
          <h3 style={{fontSize:15,fontWeight:700,color:"#fff"}}>Frequently Bought Together</h3>
        </div>
        <div style={{display:"grid",gridTemplateColumns:colsW(5),gap:12}}>
          {BOUGHT_TOGETHER.map((bt,i)=>(
            <div key={i} style={{
              background:`${bt.color}0a`,border:`1px solid ${bt.color}25`,
              borderRadius:14,padding:"16px",textAlign:"center",
              transition:"all 0.2s",cursor:"default",
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${bt.color}55`;(e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${bt.color}25`;(e.currentTarget as HTMLDivElement).style.transform="none";}}
            >
              <div style={{fontSize:11,fontWeight:700,color:bt.color,marginBottom:10,letterSpacing:"0.04em"}}>COMBO #{i+1}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:6,minHeight:34,display:"flex",alignItems:"center",justifyContent:"center"}}>{bt.a}</div>
              <div style={{width:28,height:28,borderRadius:"50%",background:`${bt.color}18`,border:`1px solid ${bt.color}33`,
                display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px",fontSize:13}}>+</div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:12,minHeight:34,display:"flex",alignItems:"center",justifyContent:"center"}}>{bt.b}</div>
              <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden",marginBottom:6}}>
                <div style={{height:"100%",width:`${bt.freq}%`,background:bt.color,borderRadius:99}}/>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:bt.color}}>{bt.freq}%</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,0.25)"}}>co-purchase rate</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

/* ── FINANCE DATA ─────────────────────────────────────────────────── */
const FIN_MONTHS = ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const FIN_DATA = [
  {m:"Jul", rev:280000, exp:190000, inflow:310000, outflow:195000},
  {m:"Aug", rev:305000, exp:198000, inflow:330000, outflow:200000},
  {m:"Sep", rev:340000, exp:205000, inflow:365000, outflow:210000},
  {m:"Oct", rev:290000, exp:215000, inflow:315000, outflow:220000},
  {m:"Nov", rev:410000, exp:220000, inflow:440000, outflow:226000},
  {m:"Dec", rev:450067, exp:282066, inflow:480000, outflow:285000},
  {m:"Jan", rev:490000, exp:295000, inflow:520000, outflow:298000},
  {m:"Feb", rev:525000, exp:305000, inflow:555000, outflow:308000},
  {m:"Mar", rev:560000, exp:315000, inflow:595000, outflow:318000},
];
const FIN_DAILY = Array.from({length:30},(_,i)=>({
  d:`D${i+1}`,
  profit: 3000 + Math.round(Math.sin(i/3)*1800 + Math.random()*1200),
  rev:    14000 + Math.round(Math.sin(i/2.5)*3000 + Math.random()*2000),
}));
const FIN_EXP_CATS = [
  {key:"utilities", label:"Utilities",          color:"#fbbf24", val:24200},
  {key:"salaries",  label:"Salaries",            color:"#38bdf8", val:128000},
  {key:"rent",      label:"Rent",                color:"#818cf8", val:45000},
  {key:"supplies",  label:"Supplies",            color:"#34d399", val:29800},
  {key:"other",     label:"Other Operational",   color:"#fb7185", val:19200},
];
const BUDGET_LIMIT = 320000;
const FIN_CURR = FIN_DATA[6]; // Jan (current)
const FIN_PREV = FIN_DATA[5]; // Dec (previous)
const FIN_CURR_PROFIT = FIN_CURR.rev - FIN_CURR.exp;
const FIN_PREV_PROFIT = FIN_PREV.rev - FIN_PREV.exp;
const FIN_PROFIT_GROWTH = (((FIN_CURR_PROFIT - FIN_PREV_PROFIT)/FIN_PREV_PROFIT)*100).toFixed(1);
// YTD (Jul–Jan = 7 months)
const YTD = FIN_DATA.slice(0,7).reduce((a,r)=>({rev:a.rev+r.rev, exp:a.exp+r.exp, inflow:a.inflow+r.inflow, outflow:a.outflow+r.outflow}),{rev:0,exp:0,inflow:0,outflow:0});

/* ── FINANCE COMPONENT ───────────────────────────────────────────── */
const Finance = () => {
  const [profitTab, setProfitTab]   = useState<"Daily"|"Monthly"|"Yearly">("Monthly");
  const [budget, setBudget]         = useState(BUDGET_LIMIT);
  const [budgetInput, setBudgetInput] = useState(String(BUDGET_LIMIT));
  const [editBudget, setEditBudget] = useState(false);

  const totalExp   = FIN_EXP_CATS.reduce((s,c)=>s+c.val,0);
  const netIncome  = FIN_CURR.rev - totalExp;
  const isProfit   = netIncome >= 0;
  const cashBal    = FIN_CURR.inflow - FIN_CURR.outflow;
  const budgetUsed = Math.min(100,(totalExp/budget)*100);
  const budgetRem  = budget - totalExp;

  const profitTrend = profitTab==="Daily"
    ? FIN_DAILY.map(d=>({name:d.d, profit:d.profit, rev:d.rev}))
    : profitTab==="Monthly"
    ? FIN_DATA.map(r=>({name:r.m, profit:r.rev-r.exp, rev:r.rev}))
    : FIN_DATA.filter((_,i)=>i%3===0).map(r=>({name:r.m+" Q",profit:(r.rev-r.exp)*3,rev:r.rev*3}));

  const grossProfit  = FIN_CURR.rev - (FIN_EXP_CATS.find(c=>c.key==="supplies")!.val + FIN_EXP_CATS.find(c=>c.key==="utilities")!.val);
  const grossMargin  = ((grossProfit/FIN_CURR.rev)*100).toFixed(1);
  const netMargin    = ((FIN_CURR_PROFIT/FIN_CURR.rev)*100).toFixed(1);
  const marginTrend  = FIN_DATA.slice(0,7).map(r=>({name:r.m, margin:+((( r.rev-r.exp)/r.rev)*100).toFixed(1)}));

  const FinTT = ({active,payload,label}:any) => {
    if(!active||!payload?.length) return null;
    return (
      <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
        <div style={{color:"rgba(255,255,255,0.45)",marginBottom:6,fontWeight:600}}>{label}</div>
        {payload.map((p:any)=>(
          <div key={p.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:p.color||p.stroke||p.fill}}/>
            <span style={{color:"rgba(255,255,255,0.55)",textTransform:"capitalize"}}>{p.name}:</span>
            <span style={{color:"#fff",fontWeight:700}}>₱{Number(p.value).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderPieLbl = ({cx,cy,midAngle,innerRadius,outerRadius,percent}:any) => {
    if(percent<0.06) return null;
    const R=Math.PI/180, r=innerRadius+(outerRadius-innerRadius)*0.55;
    const x=cx+r*Math.cos(-midAngle*R), y=cy+r*Math.sin(-midAngle*R);
    return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" style={{fontSize:11,fontWeight:700,pointerEvents:"none"}}>{(percent*100).toFixed(0)}%</text>;
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ══ 1. PAGE HEADER ══ */}
      <div className="fu1" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:700,color:"#fff",letterSpacing:"-0.01em"}}>Financial Dashboard</h1>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:3}}>Monitor profits, expenses, and cash flow — January 2026</p>
        </div>
        {/* Export */}
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <ExportMenu label="Export Report"/>
          <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:10,padding:"6px 14px"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#34d399"}} className="pulse"/>
            <span style={{fontSize:12,color:"#6ee7b7",fontWeight:600}}>Live Data</span>
          </div>
        </div>
      </div>

      {/* ══ 2. PROFIT OVERVIEW CARDS ══ */}
      <div className="fu2 grid-4col" style={{display:"grid",gridTemplateColumns:colsW(4),gap:16}}>
        {[
          {label:"Daily Profit",   value:`₱${(FIN_CURR_PROFIT/30).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",")}`, sub:"Avg today",  color:"#34d399",  bg:"rgba(52,211,153,0.1)",  I:TrendingUp,  chg:"+5.2%",  up:true},
          {label:"Monthly Profit", value:`₱${FIN_CURR_PROFIT.toLocaleString()}`,                                      sub:"January 2026",color:"#818cf8", bg:"rgba(129,140,248,0.1)", I:BarChart3,   chg:`+${FIN_PROFIT_GROWTH}%`, up:true},
          {label:"Yearly Profit",  value:`₱${(FIN_CURR_PROFIT*12).toLocaleString()}`,                                 sub:"Projected",  color:"#38bdf8",  bg:"rgba(56,189,248,0.1)",  I:DollarSign,  chg:"+18.4%", up:true},
          {label:"Net Income",     value:`₱${netIncome.toLocaleString()}`,                                             sub:"After all expenses",color:isProfit?"#34d399":"#fb7185",bg:isProfit?"rgba(52,211,153,0.1)":"rgba(251,113,133,0.1)",I:isProfit?TrendingUp:TrendingDown,chg:isProfit?"+Positive":"Deficit",up:isProfit},
        ].map((s,i)=>(
          <div key={i} className="stat-forecast" style={{borderColor:`${s.color}22`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:10,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.I size={18} color={s.color}/>
              </div>
              <span className={s.up?"chip-up":"chip-down"}>{s.up?<TrendingUp size={10}/>:<TrendingDown size={10}/>}{s.chg}</span>
            </div>
            <div style={{fontSize:22,fontWeight:700,color:s.color,marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>{s.label}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:2}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ══ 3. PROFIT TREND LINE CHART ══ */}
      <div className="fu3 card">
        <div className="card-title" style={{marginBottom:14}}>
          Profit Trend
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{display:"flex",gap:12,fontSize:11}}>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"#34d399",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.4)"}}>Profit</span></span>
              <span style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:10,height:3,background:"rgba(255,255,255,0.2)",borderRadius:99}}/><span style={{color:"rgba(255,255,255,0.4)"}}>Revenue</span></span>
            </div>
            <div className="tab-wrap">
              {(["Daily","Monthly","Yearly"] as const).map(t=>(
                <button key={t} onClick={()=>setProfitTab(t)} className={profitTab===t?"tab-on":"tab-off"}>{t}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{height:220}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitTrend} margin={{top:8,right:12,left:-10,bottom:0}}>
              <defs>
                <linearGradient id="finPG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.18}/>
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:10}} interval={profitTab==="Daily"?4:0}/>
              <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
              <Tooltip content={<FinTT/>}/>
              <Area type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={0} fill="url(#finPG)"/>
              <Line type="monotone" dataKey="rev"    stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} dot={false}/>
              <Line type="monotone" dataKey="profit" stroke="#34d399" strokeWidth={2.5} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ══ 4. EXPENSE TRACKING ══ */}
      <div className="fu3 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1fr","1.5fr"),gap:16}}>

        {/* Pie */}
        <div className="card">
          <div className="card-title">Expense Distribution</div>
          <div style={{height:190}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={FIN_EXP_CATS} cx="50%" cy="50%" innerRadius={48} outerRadius={82} paddingAngle={3} dataKey="val" stroke="none" cornerRadius={4} labelLine={false} label={renderPieLbl}>
                  {FIN_EXP_CATS.map((c,i)=><Cell key={i} fill={c.color}/>)}
                </Pie>
                <Tooltip content={({active,payload})=>{
                  if(!active||!payload?.length) return null;
                  const p=payload[0];
                  return <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"10px 14px",fontSize:12}}>
                    <div style={{color:(p.payload as any).color,fontWeight:700,marginBottom:3}}>{p.name}</div>
                    <div style={{color:"#fff",fontWeight:700}}>₱{Number(p.value).toLocaleString()}</div>
                    <div style={{color:"rgba(255,255,255,0.4)",marginTop:2}}>{((Number(p.value)/totalExp)*100).toFixed(1)}% of total</div>
                  </div>;
                }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {FIN_EXP_CATS.map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:9,height:9,borderRadius:2,background:c.color,flexShrink:0}}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",flex:1}}>{c.label}</span>
                <span style={{fontSize:11,fontWeight:700,color:c.color}}>₱{c.val.toLocaleString()}</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.25)",width:36,textAlign:"right"}}>{((c.val/totalExp)*100).toFixed(0)}%</span>
              </div>
            ))}
            <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:4,paddingTop:6,display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.5)"}}>Total Expenses</span>
              <span style={{fontSize:13,fontWeight:700,color:"#fb7185"}}>₱{totalExp.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Monthly expense bar */}
        <div className="card">
          <div className="card-title">Monthly Expenses by Category</div>
          <div style={{height:280}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FIN_DATA.slice(-6).map(r=>({name:r.m, Utilities:24200,Salaries:128000,Rent:45000,Supplies:29800,Other:r.exp-24200-128000-45000-29800}))} margin={{top:8,right:8,left:-10,bottom:0}}>
                <defs>
                  {[["util","#fbbf24"],["sal","#38bdf8"],["rent","#818cf8"],["sup","#34d399"],["oth","#fb7185"]].map(([id,c])=>(
                    <linearGradient key={id} id={`feg_${id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity={1}/>
                      <stop offset="100%" stopColor={c} stopOpacity={0.5}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<FinTT/>}/>
                <Bar dataKey="Utilities" stackId="e" fill="url(#feg_util)" radius={[0,0,0,0]}/>
                <Bar dataKey="Salaries"  stackId="e" fill="url(#feg_sal)"  radius={[0,0,0,0]}/>
                <Bar dataKey="Rent"      stackId="e" fill="url(#feg_rent)" radius={[0,0,0,0]}/>
                <Bar dataKey="Supplies"  stackId="e" fill="url(#feg_sup)"  radius={[0,0,0,0]}/>
                <Bar dataKey="Other"     stackId="e" fill="url(#feg_oth)"  radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:4}}>
            {[["Utilities","#fbbf24"],["Salaries","#38bdf8"],["Rent","#818cf8"],["Supplies","#34d399"],["Other","#fb7185"]].map(([l,c])=>(
              <span key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"rgba(255,255,255,0.4)"}}>
                <div style={{width:9,height:9,borderRadius:2,background:c}}/>{l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 5. NET INCOME + COMPARISON + MARGIN ══ */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsW(3),gap:16}}>

        {/* Net Income card */}
        <div style={{background:isProfit?"linear-gradient(135deg,rgba(52,211,153,0.1),rgba(52,211,153,0.03))":"linear-gradient(135deg,rgba(251,113,133,0.1),rgba(251,113,133,0.03))",border:`1px solid ${isProfit?"rgba(52,211,153,0.25)":"rgba(251,113,133,0.25)"}`,borderRadius:16,padding:"22px 24px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:36,height:36,borderRadius:10,background:isProfit?"rgba(52,211,153,0.15)":"rgba(251,113,133,0.15)",border:`1px solid ${isProfit?"rgba(52,211,153,0.3)":"rgba(251,113,133,0.3)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <CircleDollarSign size={18} color={isProfit?"#34d399":"#fb7185"}/>
            </div>
            <span style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.7)"}}>Net Income Computation</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[
              {l:"Total Revenue",  v:`₱${FIN_CURR.rev.toLocaleString()}`,   c:"#34d399"},
              {l:"Total Expenses", v:`₱${totalExp.toLocaleString()}`,        c:"#fb7185"},
            ].map(s=>(
              <div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.03)",borderRadius:10}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>{s.l}</span>
                <span style={{fontSize:14,fontWeight:700,color:s.c}}>{s.v}</span>
              </div>
            ))}
            <div style={{height:1,background:"rgba(255,255,255,0.07)"}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:isProfit?"rgba(52,211,153,0.08)":"rgba(251,113,133,0.08)",borderRadius:10,border:`1px solid ${isProfit?"rgba(52,211,153,0.2)":"rgba(251,113,133,0.2)"}`}}>
              <span style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.8)"}}>Net Profit</span>
              <span style={{fontSize:20,fontWeight:800,color:isProfit?"#34d399":"#fb7185"}}>₱{netIncome.toLocaleString()}</span>
            </div>
            <div style={{textAlign:"center",fontSize:11,color:isProfit?"#6ee7b7":"#fda4af",fontWeight:600}}>
              {isProfit?"✓ Revenue exceeds expenses — Positive cash position":"⚠ Expenses exceed revenue — Review costs"}
            </div>
          </div>
        </div>

        {/* Financial Comparison */}
        <div className="card">
          <div className="card-title" style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <BarChart3 size={14} color="#818cf8"/>
              Month-over-Month Comparison
            </div>
          </div>
          <div style={{height:160,marginBottom:12}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                {name:"Revenue", prev:FIN_PREV.rev,   curr:FIN_CURR.rev},
                {name:"Expenses",prev:FIN_PREV.exp,   curr:totalExp},
                {name:"Profit",  prev:FIN_PREV_PROFIT, curr:FIN_CURR_PROFIT},
              ]} margin={{top:4,right:4,left:-20,bottom:0}} barGap={4}>
                <defs>
                  <linearGradient id="cmpP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.2)"/><stop offset="100%" stopColor="rgba(255,255,255,0.06)"/></linearGradient>
                  <linearGradient id="cmpC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#6366f1" stopOpacity={0.5}/></linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:10}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:10}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<FinTT/>}/>
                <Bar dataKey="prev" name="Dec (Prev)" fill="url(#cmpP)" radius={[4,4,0,0]} barSize={18}/>
                <Bar dataKey="curr" name="Jan (Curr)" fill="url(#cmpC)" radius={[4,4,0,0]} barSize={18}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[
              {l:"Profit Growth",  v:`+${FIN_PROFIT_GROWTH}%`, c:"#34d399"},
              {l:"Revenue Growth", v:`+${(((FIN_CURR.rev-FIN_PREV.rev)/FIN_PREV.rev)*100).toFixed(1)}%`, c:"#818cf8"},
              {l:"YTD Revenue",    v:`₱${(YTD.rev/1000000).toFixed(2)}M`,                              c:"#38bdf8"},
            ].map(s=>(
              <div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 12px",background:"rgba(255,255,255,0.03)",borderRadius:8}}>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.45)"}}>{s.l}</span>
                <span style={{fontSize:13,fontWeight:700,color:s.c}}>{s.v}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,padding:"8px 12px",background:"rgba(52,211,153,0.06)",border:"1px solid rgba(52,211,153,0.15)",borderRadius:8}}>
            <p style={{fontSize:11,color:"#6ee7b7",fontStyle:"italic"}}>
              "Profit increased by <strong>{FIN_PROFIT_GROWTH}%</strong> compared to last month."
            </p>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="card">
          <div className="card-title" style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <TrendingUp size={14} color="#38bdf8"/>
              Profit Margin Analysis
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:10,marginBottom:14}}>
            {[
              {l:"Gross Profit",  v:`₱${grossProfit.toLocaleString()}`,   c:"#34d399"},
              {l:"Net Profit",    v:`₱${FIN_CURR_PROFIT.toLocaleString()}`,c:"#818cf8"},
              {l:"Gross Margin",  v:`${grossMargin}%`,                     c:"#38bdf8"},
              {l:"Net Margin",    v:`${netMargin}%`,                       c:"#fbbf24"},
            ].map(s=>(
              <div key={s.l} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"12px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:700,color:s.c,marginBottom:3}}>{s.v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:6,fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>MARGIN TREND (Jul–Jan)</div>
          <div style={{height:80}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marginTrend} margin={{top:4,right:4,left:-30,bottom:0}}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.25)",fontSize:9}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.25)",fontSize:9}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={({active,payload,label})=>{
                  if(!active||!payload?.length) return null;
                  return <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 10px",fontSize:11}}>
                    <span style={{color:"rgba(255,255,255,0.4)"}}>{label}: </span>
                    <span style={{color:"#38bdf8",fontWeight:700}}>{payload[0].value}%</span>
                  </div>;
                }}/>
                <Line type="monotone" dataKey="margin" stroke="#38bdf8" strokeWidth={2} dot={{fill:"#38bdf8",r:3,strokeWidth:0}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ══ 6. CASH FLOW ══ */}
      <div className="fu4 grid-split" style={{display:"grid",gridTemplateColumns:colsSplitW("1fr","2fr"),gap:16}}>
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <Wallet size={14} color="#a78bfa"/>
              Cash Flow — January
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:4}}>
            {[
              {l:"Cash Inflow",   v:`₱${FIN_CURR.inflow.toLocaleString()}`,  c:"#34d399", bg:"rgba(52,211,153,0.08)",   border:"rgba(52,211,153,0.2)",   pct:100},
              {l:"Cash Outflow",  v:`₱${FIN_CURR.outflow.toLocaleString()}`, c:"#fb7185", bg:"rgba(251,113,133,0.08)",  border:"rgba(251,113,133,0.2)",  pct:Math.round((FIN_CURR.outflow/FIN_CURR.inflow)*100)},
              {l:"Net Cash Balance",v:`₱${cashBal.toLocaleString()}`,        c:"#a78bfa", bg:"rgba(167,139,250,0.08)",  border:"rgba(167,139,250,0.2)",  pct:Math.round((cashBal/FIN_CURR.inflow)*100)},
            ].map(s=>(
              <div key={s.l} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:12,padding:"14px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{fontSize:12,color:"rgba(255,255,255,0.55)",fontWeight:600}}>{s.l}</span>
                  <span style={{fontSize:16,fontWeight:700,color:s.c}}>{s.v}</span>
                </div>
                <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${s.pct}%`,background:`linear-gradient(90deg,${s.c},${s.c}88)`,borderRadius:99}}/>
                </div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:4}}>{s.pct}% of inflow</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Cash Flow Trend — Jul to Mar</div>
          <div style={{height:210}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FIN_DATA.map(r=>({name:r.m,inflow:r.inflow,outflow:r.outflow,balance:r.inflow-r.outflow}))} margin={{top:8,right:12,left:-10,bottom:0}}>
                <defs>
                  <linearGradient id="cfBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.18}/>
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4"/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<FinTT/>}/>
                <Area type="monotone" dataKey="balance" stroke="#a78bfa" strokeWidth={0} fill="url(#cfBal)"/>
                <Line type="monotone" dataKey="inflow"  name="Inflow"  stroke="#34d399" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="outflow" name="Outflow" stroke="#fb7185" strokeWidth={2} dot={false} strokeDasharray="5 3"/>
                <Line type="monotone" dataKey="balance" name="Balance" stroke="#a78bfa" strokeWidth={2.5} dot={{fill:"#a78bfa",r:3,strokeWidth:0}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{display:"flex",gap:16,marginTop:6}}>
            {[["Inflow","#34d399"],["Outflow","#fb7185"],["Balance","#a78bfa"]].map(([l,c])=>(
              <span key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"rgba(255,255,255,0.4)"}}>
                <div style={{width:10,height:3,background:c,borderRadius:99}}/>{l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 7. BUDGET TRACKER ══ */}
      <div className="fu5 grid-split" style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <Wallet size={14} color="#fbbf24"/>
              Monthly Budget Tracker
            </div>
            <button className="btn" style={{padding:"4px 10px",fontSize:11}} onClick={()=>{setEditBudget(v=>!v);}}>
              {editBudget?"Cancel":"Set Budget"}
            </button>
          </div>
          {editBudget && (
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <input value={budgetInput} onChange={e=>setBudgetInput(e.target.value)} className="inp" style={{flex:1}} placeholder="Enter budget limit ₱"/>
              <button className="btn-g" style={{padding:"8px 14px"}} onClick={()=>{const v=+budgetInput.replace(/[^0-9]/g,"");if(v>0){setBudget(v);setEditBudget(false);}}}>Save</button>
            </div>
          )}
          <div style={{marginBottom:16}}>
            {/* Radial-style progress (fake with divs) */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:10}}>
              <div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:4}}>Budget Used</div>
                <div style={{fontSize:32,fontWeight:800,color:budgetUsed>90?"#fb7185":budgetUsed>70?"#fbbf24":"#34d399"}}>{budgetUsed.toFixed(1)}%</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Remaining</div>
                <div style={{fontSize:18,fontWeight:700,color:budgetRem>0?"#34d399":"#fb7185"}}>₱{Math.abs(budgetRem).toLocaleString()}{budgetRem<0?" over":""}</div>
              </div>
            </div>
            <div style={{height:12,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden",position:"relative"}}>
              <div style={{
                height:"100%",
                width:`${Math.min(100,budgetUsed)}%`,
                background:budgetUsed>90?"linear-gradient(90deg,#fb7185,#fda4af)":budgetUsed>70?"linear-gradient(90deg,#fbbf24,#fde68a)":"linear-gradient(90deg,#34d399,#6ee7b7)",
                borderRadius:99,transition:"width 0.6s ease",
                boxShadow:budgetUsed>90?"0 0 12px rgba(251,113,133,0.4)":budgetUsed>70?"0 0 12px rgba(251,191,36,0.4)":"0 0 12px rgba(52,211,153,0.35)",
              }}/>
              <div className="shimmer-bar" style={{position:"absolute",inset:0,borderRadius:99}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10,color:"rgba(255,255,255,0.25)"}}>
              <span>₱0</span>
              <span>Limit: ₱{budget.toLocaleString()}</span>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[
              {l:"Budget Limit",   v:`₱${budget.toLocaleString()}`,       c:"rgba(255,255,255,0.6)"},
              {l:"Current Spending",v:`₱${totalExp.toLocaleString()}`,    c:budgetUsed>90?"#fb7185":budgetUsed>70?"#fbbf24":"#34d399"},
              {l:"Remaining",     v:`₱${Math.abs(budgetRem).toLocaleString()}${budgetRem<0?" over":""}`, c:budgetRem>=0?"#34d399":"#fb7185"},
            ].map(s=>(
              <div key={s.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"rgba(255,255,255,0.03)",borderRadius:9}}>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.45)"}}>{s.l}</span>
                <span style={{fontSize:13,fontWeight:700,color:s.c}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* YTD Summary */}
        <div className="card">
          <div className="card-title">
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <BarChart3 size={14} color="#38bdf8"/>
              Year-to-Date Performance
            </div>
            <span className="badge-v" style={{fontSize:10}}>Jul 2025 – Jan 2026</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:10,marginBottom:14}}>
            {[
              {l:"YTD Revenue",  v:`₱${(YTD.rev/1000000).toFixed(2)}M`,  c:"#34d399",  bg:"rgba(52,211,153,0.08)",  border:"rgba(52,211,153,0.2)"},
              {l:"YTD Expenses", v:`₱${(YTD.exp/1000000).toFixed(2)}M`,  c:"#fb7185",  bg:"rgba(251,113,133,0.08)", border:"rgba(251,113,133,0.2)"},
              {l:"YTD Profit",   v:`₱${((YTD.rev-YTD.exp)/1000000).toFixed(2)}M`, c:"#818cf8", bg:"rgba(129,140,248,0.08)", border:"rgba(129,140,248,0.2)"},
              {l:"YTD Margin",   v:`${(((YTD.rev-YTD.exp)/YTD.rev)*100).toFixed(1)}%`, c:"#fbbf24", bg:"rgba(251,191,36,0.08)", border:"rgba(251,191,36,0.2)"},
            ].map(s=>(
              <div key={s.l} style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:12,padding:"14px",textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:800,color:s.c,marginBottom:4}}>{s.v}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{height:90}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FIN_DATA.slice(0,7).map(r=>({name:r.m,profit:r.rev-r.exp}))} margin={{top:4,right:4,left:-20,bottom:0}}>
                <defs>
                  <linearGradient id="ytdG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false}/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.25)",fontSize:9}}/>
                <YAxis hide/>
                <Tooltip content={<FinTT/>}/>
                <Bar dataKey="profit" fill="url(#ytdG)" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ══ 8. FINANCIAL REPORTS ══ */}
      <div className="fu5 card">
        <div className="card-title" style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <ClipboardList size={15} color="#818cf8"/>
            Financial Reports
          </div>
          <span style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Download or export financial statements</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:12}}>
          {[
            {title:"Profit & Loss Summary", desc:"Revenue, expenses, and net profit breakdown for the selected period.", icon:TrendingUp,  color:"#34d399"},
            {title:"Expense Report",        desc:"Detailed categorized expense report with monthly comparisons.",        icon:Receipt,     color:"#fb7185"},
            {title:"Financial Summary",     desc:"Full financial overview including cash flow, margins, and YTD stats.", icon:BarChart3,   color:"#818cf8"},
          ].map((r,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"18px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:`${r.color}15`,border:`1px solid ${r.color}28`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <r.icon size={17} color={r.color}/>
                </div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{r.title}</div>
              </div>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.35)",lineHeight:1.55,marginBottom:14}}>{r.desc}</p>
              <ExportMenu label={`Export ${r.title.split(" ")[0]}`}/>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

/* ── USER PAGE DATA ───────────────────────────────────────────────── */
type URole   = "Admin"|"Manager"|"Staff";
type UStatus = "Active"|"Suspended"|"Disabled";
interface AppUser {
  id:number; name:string; username:string; email:string;
  role:URole; status:UStatus; lastLogin:string; twoFA:boolean; failedAttempts:number;
}
const INIT_USERS: AppUser[] = [
  {id:1, name:"Juan dela Cruz",    username:"juandlc",    email:"juan@baryalytics.ph",    role:"Admin",   status:"Active",    lastLogin:"2026-03-09 08:14",  twoFA:true,  failedAttempts:0},
  {id:2, name:"Maria Santos",      username:"msantos",    email:"maria@baryalytics.ph",   role:"Manager", status:"Active",    lastLogin:"2026-03-09 07:58",  twoFA:false, failedAttempts:0},
  {id:3, name:"Carlo Mendoza",     username:"cmendoza",   email:"carlo@baryalytics.ph",   role:"Staff",   status:"Active",    lastLogin:"2026-03-08 17:30",  twoFA:false, failedAttempts:1},
  {id:4, name:"Ana Reyes",         username:"areyes",     email:"ana@baryalytics.ph",     role:"Staff",   status:"Active",    lastLogin:"2026-03-08 14:22",  twoFA:false, failedAttempts:0},
  {id:5, name:"Liza Pangilinan",   username:"lpangili",   email:"liza@baryalytics.ph",    role:"Manager", status:"Suspended", lastLogin:"2026-03-05 09:10",  twoFA:true,  failedAttempts:4},
  {id:6, name:"Ben Torres",        username:"btorres",    email:"ben@baryalytics.ph",     role:"Staff",   status:"Active",    lastLogin:"2026-03-07 11:45",  twoFA:false, failedAttempts:0},
  {id:7, name:"Rosa Garcia",       username:"rgarcia",    email:"rosa@baryalytics.ph",    role:"Staff",   status:"Disabled",  lastLogin:"2026-02-14 08:00",  twoFA:false, failedAttempts:0},
];
const INIT_LOGS = [
  {id:1, user:"Juan dela Cruz",  action:"User Login",                 detail:"Successful login from 192.168.1.1",          ts:"2026-03-09 08:14", type:"auth"},
  {id:2, user:"Maria Santos",    action:"User Login",                 detail:"Successful login from 192.168.1.8",          ts:"2026-03-09 07:58", type:"auth"},
  {id:3, user:"Juan dela Cruz",  action:"Product Added",              detail:"Added Coca-Cola 1.5L × 500 units",           ts:"2026-03-09 08:30", type:"inventory"},
  {id:4, user:"Carlo Mendoza",   action:"Sales Transaction",          detail:"Recorded sale: ₱14,500 — Invoice #2403",    ts:"2026-03-08 17:30", type:"sales"},
  {id:5, user:"Liza Pangilinan", action:"Failed Login Attempt",       detail:"Wrong password (attempt 4/5) — Suspended",  ts:"2026-03-05 09:10", type:"security"},
  {id:6, user:"Maria Santos",    action:"Inventory Updated",          detail:"Running Shoes stock: 50 → 75 units",         ts:"2026-03-09 09:05", type:"inventory"},
  {id:7, user:"Ana Reyes",       action:"Sales Transaction",          detail:"Recorded sale: ₱8,200 — Invoice #2404",     ts:"2026-03-08 14:22", type:"sales"},
  {id:8, user:"Juan dela Cruz",  action:"User Account Suspended",     detail:"Suspended Liza Pangilinan due to 4 failed attempts", ts:"2026-03-05 09:11", type:"security"},
  {id:9, user:"Ben Torres",      action:"Product Viewed",             detail:"Viewed Iphone 15 stock details",             ts:"2026-03-07 11:45", type:"inventory"},
  {id:10,user:"Juan dela Cruz",  action:"User Logout",                detail:"Session ended — duration 2h 18m",            ts:"2026-03-09 10:32", type:"auth"},
];
const PERMISSIONS: {feature:string; admin:boolean; manager:boolean; staff:boolean}[] = [
  {feature:"Dashboard Overview",        admin:true,  manager:true,  staff:true},
  {feature:"Sales Recording",           admin:true,  manager:true,  staff:true},
  {feature:"Product Viewing",           admin:true,  manager:true,  staff:true},
  {feature:"Inventory Management",      admin:true,  manager:true,  staff:false},
  {feature:"Supplier Management",       admin:true,  manager:true,  staff:false},
  {feature:"Financial Dashboard",       admin:true,  manager:true,  staff:false},
  {feature:"AI Forecasting",            admin:true,  manager:true,  staff:false},
  {feature:"User Management",           admin:true,  manager:false, staff:false},
  {feature:"Role Assignment",           admin:true,  manager:false, staff:false},
  {feature:"System Settings",           admin:true,  manager:false, staff:false},
  {feature:"Export Reports",            admin:true,  manager:true,  staff:false},
  {feature:"Delete Records",            admin:true,  manager:false, staff:false},
];
const ROLE_COLORS: Record<URole,{c:string;bg:string;border:string;chip:string}> = {
  Admin:   {c:"#fb7185",bg:"rgba(251,113,133,0.12)",border:"rgba(251,113,133,0.25)",chip:"badge-r"},
  Manager: {c:"#fbbf24",bg:"rgba(251,191,36,0.12)", border:"rgba(251,191,36,0.25)", chip:"badge-a"},
  Staff:   {c:"#34d399",bg:"rgba(52,211,153,0.12)", border:"rgba(52,211,153,0.25)", chip:"badge-g"},
};
const STATUS_COLORS: Record<UStatus,{c:string;chip:string}> = {
  Active:    {c:"#34d399", chip:"badge-g"},
  Suspended: {c:"#fbbf24", chip:"badge-a"},
  Disabled:  {c:"rgba(255,255,255,0.3)", chip:"badge-r"},
};
const LOG_COLORS: Record<string,{c:string;icon:string}> = {
  auth:      {c:"#818cf8", icon:"🔑"},
  sales:     {c:"#34d399", icon:"💰"},
  inventory: {c:"#38bdf8", icon:"📦"},
  security:  {c:"#fb7185", icon:"🚨"},
};
const EMPTY_USER: Omit<AppUser,"id"> = {name:"",username:"",email:"",role:"Staff",status:"Active",lastLogin:"—",twoFA:false,failedAttempts:0};

/* ── USER PAGE COMPONENT ──────────────────────────────────────────── */
const UserPage = () => {
  const showToast = useToast();
  const [users, setUsers]         = useState<AppUser[]>(INIT_USERS);
  const [logs]                    = useState(INIT_LOGS);
  const [tab, setTab]             = useState<"users"|"roles"|"logs"|"security">("users");
  const [modal, setModal]         = useState<"add"|"edit"|"delete"|null>(null);
  const [selected, setSelected]   = useState<AppUser|null>(null);
  const [form, setForm]           = useState<Omit<AppUser,"id">>(EMPTY_USER);
  const [logFilter, setLogFilter] = useState("All");
  const [search, setSearch]       = useState("");
  const [userErrors, setUserErrors] = useState<Record<string,boolean>>({});
  const [userShake,  setUserShake]  = useState(false);
  const userShakeForm = () => { setUserShake(true); setTimeout(()=>setUserShake(false),400); };
  const userClearErr  = (f:string) => setUserErrors(e=>({...e,[f]:false}));

  const openAdd    = ()=>{setForm(EMPTY_USER);setUserErrors({});setModal("add");};
  const openEdit   = (u:AppUser)=>{setSelected(u);setForm({name:u.name,username:u.username,email:u.email,role:u.role,status:u.status,lastLogin:u.lastLogin,twoFA:u.twoFA,failedAttempts:u.failedAttempts});setUserErrors({});setModal("edit");};
  const openDelete = (u:AppUser)=>{setSelected(u);setModal("delete");};
  const saveAdd    = ()=>{
    const errs:Record<string,boolean>={};
    if(!form.name)     errs.name=true;
    if(!form.username) errs.username=true;
    if(!form.email)    errs.email=true;
    if(Object.keys(errs).length){setUserErrors(errs);userShakeForm();return;}
    setUserErrors({});
    setUsers(p=>[...p,{...form,id:Math.max(0,...p.map(u=>u.id))+1}]);
    showToast(`${form.name} added as ${form.role}! 👤`);
    setModal(null);
  };
  const saveEdit   = ()=>{
    const errs:Record<string,boolean>={};
    if(!form.name)     errs.name=true;
    if(!form.username) errs.username=true;
    if(!form.email)    errs.email=true;
    if(Object.keys(errs).length){setUserErrors(errs);userShakeForm();return;}
    setUserErrors({});
    if(!selected)return;setUsers(p=>p.map(u=>u.id===selected.id?{...form,id:u.id}:u));
    showToast(`${form.name}'s profile updated! ✏️`);
    setModal(null);
  };
  const doDelete   = ()=>{
    if(!selected)return;
    showToast(`${selected.name} removed`,"info");
    setUsers(p=>p.filter(u=>u.id!==selected.id));setModal(null);
  };
  const toggleStatus = (u:AppUser)=>setUsers(p=>p.map(x=>x.id===u.id?{...x,status:x.status==="Active"?"Suspended":"Active"}:x));

  const filtered = users.filter(u=>
    u.name.toLowerCase().includes(search.toLowerCase())||
    u.username.toLowerCase().includes(search.toLowerCase())||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:   users.length,
    active:  users.filter(u=>u.status==="Active").length,
    admins:  users.filter(u=>u.role==="Admin").length,
    managers:users.filter(u=>u.role==="Manager").length,
    staff:   users.filter(u=>u.role==="Staff").length,
    suspended:users.filter(u=>u.status==="Suspended").length,
  };
  const pieRoleData = [
    {name:"Admin",   value:stats.admins,   color:"#fb7185"},
    {name:"Manager", value:stats.managers, color:"#fbbf24"},
    {name:"Staff",   value:stats.staff,    color:"#34d399"},
  ];
  const filteredLogs = logFilter==="All" ? logs : logs.filter(l=>l.type===logFilter.toLowerCase());
  const suspicious   = users.filter(u=>u.failedAttempts>=3);

  const FLD = ({label,ch}:{label:string;ch:React.ReactNode})=>(
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <label style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.4)",letterSpacing:"0.05em"}}>{label}</label>
      {ch}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>

      {/* ── Header ── */}
      <div className="fu1" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
        <div>
          <h1 style={{fontSize:24,fontWeight:700,color:"#fff",letterSpacing:"-0.01em"}}>User Management</h1>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginTop:3}}>Manage users, roles, permissions, and account security</p>
        </div>
        <button onClick={openAdd} className="btn-g" style={{display:"flex",alignItems:"center",gap:7}}>
          <Plus size={15}/> Add User
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="fu2 grid-5col" style={{display:"grid",gridTemplateColumns:colsW(5),gap:14}}>
        {[
          {label:"Total Users",    value:stats.total,    color:"#818cf8", bg:"rgba(129,140,248,0.1)", I:Users},
          {label:"Active Users",   value:stats.active,   color:"#34d399", bg:"rgba(52,211,153,0.1)",  I:PackageCheck},
          {label:"Admins",         value:stats.admins,   color:"#fb7185", bg:"rgba(251,113,133,0.1)", I:User},
          {label:"Managers",       value:stats.managers, color:"#fbbf24", bg:"rgba(251,191,36,0.1)",  I:Briefcase},
          {label:"Staff Members",  value:stats.staff,    color:"#38bdf8", bg:"rgba(56,189,248,0.1)",  I:Users},
        ].map((s,i)=>(
          <div key={i} className="stat-forecast" style={{borderColor:`${s.color}22`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{width:34,height:34,borderRadius:9,background:s.bg,border:`1px solid ${s.color}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <s.I size={16} color={s.color}/>
              </div>
              {i===0&&stats.suspended>0&&<span className="chip-down"><TrendingDown size={9}/>{stats.suspended} suspended</span>}
            </div>
            <div style={{fontSize:28,fontWeight:800,color:s.color,marginBottom:3}}>{s.value}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="fu2" style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
        <div className="tab-wrap">
          {([["users","User List"],["roles","Roles & Permissions"],["logs","Activity Logs"],["security","Security"]] as const).map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} className={tab===k?"tab-on":"tab-off"}>{l}</button>
          ))}
        </div>
        {suspicious.length>0&&(
          <div style={{display:"flex",alignItems:"center",gap:7,background:"rgba(251,113,133,0.08)",border:"1px solid rgba(251,113,133,0.2)",borderRadius:10,padding:"6px 12px",marginLeft:"auto"}}>
            <AlertTriangle size={13} color="#fb7185"/>
            <span style={{fontSize:12,color:"#fda4af",fontWeight:600}}>{suspicious.length} suspicious account{suspicious.length>1?"s":""} detected</span>
          </div>
        )}
      </div>

      {/* ══ TAB: USER LIST ══ */}
      {tab==="users"&&(
        <div className="fu3" style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* search */}
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{position:"relative",flex:1,minWidth:220}}>
              <Search size={14} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.3)"}}/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, username or email…" className="inp" style={{paddingLeft:36}}/>
            </div>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>{filtered.length} user{filtered.length!==1?"s":""}</span>
          </div>

          <div className="card" style={{padding:0}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:860}}>
                <thead>
                  <tr>
                    {["Name","Username","Email","Role","Status","Last Login","2FA","Actions"].map(h=>(
                      <th key={h} className="th" style={{textAlign:h==="Name"||h==="Email"?"left":undefined,paddingLeft:h==="Name"?20:undefined}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length===0?(
                    <EmptyState q={search} icon="👤"
                      title={search?`No users matching "${search}"`:"No users found"}
                      sub={search?"Try searching by name, username or email":"Add your first user using the Add User button"}/>
                  ):filtered.map(u=>{
                    const rc=ROLE_COLORS[u.role];
                    const sc=STATUS_COLORS[u.status];
                    return (
                      <tr key={u.id} className="tr">
                        <td className="td" style={{textAlign:"left",paddingLeft:20}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:32,height:32,borderRadius:"50%",background:rc.bg,border:`1px solid ${rc.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,fontWeight:700,color:rc.c}}>
                              {u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                            </div>
                            <span style={{fontWeight:600,color:"#e2e8f0"}}>{u.name}</span>
                          </div>
                        </td>
                        <td className="td" style={{color:"rgba(255,255,255,0.5)",fontFamily:"monospace",fontSize:12}}>@{u.username}</td>
                        <td className="td" style={{textAlign:"left",color:"rgba(255,255,255,0.5)",fontSize:12}}>{u.email}</td>
                        <td className="td"><span className={rc.chip}>{u.role}</span></td>
                        <td className="td">
                          <div style={{display:"flex",alignItems:"center",gap:5,justifyContent:"center"}}>
                            <div style={{width:6,height:6,borderRadius:"50%",background:sc.c,boxShadow:u.status==="Active"?`0 0 6px ${sc.c}88`:"none"}}/>
                            <span style={{fontSize:12,color:sc.c,fontWeight:600}}>{u.status}</span>
                          </div>
                        </td>
                        <td className="td" style={{color:"rgba(255,255,255,0.35)",fontSize:11}}>{u.lastLogin}</td>
                        <td className="td">
                          <span style={{fontSize:11,fontWeight:700,color:u.twoFA?"#34d399":"rgba(255,255,255,0.2)"}}>{u.twoFA?"ON":"OFF"}</span>
                        </td>
                        <td className="td">
                          <div style={{display:"flex",gap:6,justifyContent:"center"}}>
                            <button onClick={()=>openEdit(u)} className="btn" style={{padding:"5px 10px",fontSize:11}}>Edit</button>
                            <button onClick={()=>toggleStatus(u)} className="btn" style={{padding:"5px 10px",fontSize:11,color:u.status==="Active"?"#fbbf24":"#34d399",borderColor:u.status==="Active"?"rgba(251,191,36,0.3)":"rgba(52,211,153,0.3)"}}>
                              {u.status==="Active"?"Suspend":"Activate"}
                            </button>
                            <button onClick={()=>openDelete(u)} style={{background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.2)",borderRadius:8,padding:"5px 8px",cursor:"pointer",color:"#fda4af",display:"flex",alignItems:"center"}}>
                              <Trash2 size={13}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role distribution pie */}
          <div className="card" style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:24,alignItems:"center",padding:"20px 24px"}}>
            <div style={{width:140,height:140}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieRoleData} cx="50%" cy="50%" innerRadius={38} outerRadius={62} paddingAngle={4} dataKey="value" stroke="none" cornerRadius={4}>
                    {pieRoleData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip content={({active,payload})=>{
                    if(!active||!payload?.length)return null;
                    const p=payload[0];
                    return <div style={{background:"#1a1a28",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"8px 12px",fontSize:12}}>
                      <div style={{color:(p.payload as any).color,fontWeight:700}}>{p.name}: {p.value}</div>
                    </div>;
                  }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:12}}>User Role Distribution</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {pieRoleData.map((r,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:10,height:10,borderRadius:2,background:r.color,flexShrink:0}}/>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.55)",flex:1}}>{r.name}</span>
                    <span style={{fontSize:12,fontWeight:700,color:r.color}}>{r.value} user{r.value!==1?"s":""}</span>
                    <span style={{fontSize:11,color:"rgba(255,255,255,0.25)",width:36,textAlign:"right"}}>{((r.value/stats.total)*100).toFixed(0)}%</span>
                    <div style={{width:80,height:5,background:"rgba(255,255,255,0.05)",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${(r.value/stats.total)*100}%`,background:r.color,borderRadius:99}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: ROLES & PERMISSIONS ══ */}
      {tab==="roles"&&(
        <div className="fu3" style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Role definition cards */}
          <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:14}}>
            {(Object.entries(ROLE_COLORS) as [URole, typeof ROLE_COLORS[URole]][]).map(([role,rc])=>(
              <div key={role} style={{background:rc.bg,border:`1px solid ${rc.border}`,borderRadius:14,padding:"18px 20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                  <div style={{width:36,height:36,borderRadius:10,background:`${rc.c}22`,border:`1px solid ${rc.c}44`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <User size={17} color={rc.c}/>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{role}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>
                      {role==="Admin"?"Full system access":role==="Manager"?"Inventory & reports":"Sales & product viewing"}
                    </div>
                  </div>
                </div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>
                  {role==="Admin"&&"Can manage users, roles, all data, export reports, and configure system settings."}
                  {role==="Manager"&&"Can manage inventory, view financial reports, manage suppliers, and run AI forecasts."}
                  {role==="Staff"&&"Can record sales transactions and view product and stock information only."}
                </div>
                <div style={{marginTop:12,padding:"6px 10px",background:"rgba(0,0,0,0.2)",borderRadius:8,fontSize:11,color:rc.c,fontWeight:600}}>
                  {users.filter(u=>u.role===role).length} user{users.filter(u=>u.role===role).length!==1?"s":""} assigned
                </div>
              </div>
            ))}
          </div>

          {/* Permissions table */}
          <div className="card" style={{padding:0}}>
            <div style={{padding:"16px 20px 0"}}>
              <div className="card-title" style={{marginBottom:0}}>Feature Permission Matrix</div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr>
                    <th className="th" style={{textAlign:"left",paddingLeft:20}}>Feature</th>
                    {(["Admin","Manager","Staff"] as URole[]).map(r=>(
                      <th key={r} className="th" style={{color:ROLE_COLORS[r].c}}>{r}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((p,i)=>(
                    <tr key={i} className="tr">
                      <td className="td" style={{textAlign:"left",paddingLeft:20,color:"rgba(255,255,255,0.65)",fontWeight:500}}>{p.feature}</td>
                      {([p.admin,p.manager,p.staff]).map((has,j)=>(
                        <td key={j} className="td">
                          {has
                            ? <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(52,211,153,0.15)",border:"1px solid rgba(52,211,153,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
                                <span style={{fontSize:12,color:"#34d399",fontWeight:700}}>✓</span>
                              </div>
                            : <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto"}}>
                                <span style={{fontSize:12,color:"rgba(255,255,255,0.15)"}}>✕</span>
                              </div>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: ACTIVITY LOGS ══ */}
      {tab==="logs"&&(
        <div className="fu3" style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontWeight:600}}>FILTER:</span>
            <div className="tab-wrap">
              {["All","Auth","Sales","Inventory","Security"].map(f=>(
                <button key={f} onClick={()=>setLogFilter(f)} className={logFilter===f?"tab-on":"tab-off"}>{f}</button>
              ))}
            </div>
            <span style={{marginLeft:"auto",fontSize:12,color:"rgba(255,255,255,0.3)"}}>{filteredLogs.length} entries</span>
          </div>

          <div className="card" style={{padding:0}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:720}}>
                <thead>
                  <tr>{["Type","User","Action","Detail","Timestamp"].map(h=><th key={h} className="th" style={{textAlign:h==="Detail"||h==="Action"?"left":undefined}}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredLogs.map(l=>{
                    const lc=LOG_COLORS[l.type]||{c:"#818cf8",icon:"📋"};
                    return (
                      <tr key={l.id} className="tr">
                        <td className="td">
                          <div style={{width:30,height:30,borderRadius:8,background:`${lc.c}15`,border:`1px solid ${lc.c}28`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",fontSize:14}}>
                            {lc.icon}
                          </div>
                        </td>
                        <td className="td" style={{fontWeight:600,color:"rgba(255,255,255,0.7)",whiteSpace:"nowrap"}}>{l.user}</td>
                        <td className="td" style={{textAlign:"left",color:lc.c,fontWeight:600,whiteSpace:"nowrap"}}>{l.action}</td>
                        <td className="td" style={{textAlign:"left",color:"rgba(255,255,255,0.4)",fontSize:12,maxWidth:280}}>{l.detail}</td>
                        <td className="td" style={{color:"rgba(255,255,255,0.3)",fontSize:11,whiteSpace:"nowrap",fontFamily:"monospace"}}>{l.ts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══ TAB: SECURITY ══ */}
      {tab==="security"&&(
        <div className="fu3" style={{display:"flex",flexDirection:"column",gap:16}}>

          {/* Suspicious alerts */}
          {suspicious.length>0&&(
            <div style={{background:"rgba(251,113,133,0.07)",border:"1px solid rgba(251,113,133,0.22)",borderRadius:14,padding:"16px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <AlertTriangle size={16} color="#fb7185"/>
                <span style={{fontSize:13,fontWeight:700,color:"#fb7185"}}>Suspicious Activity Detected</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {suspicious.map(u=>(
                  <div key={u.id} style={{background:"rgba(251,113,133,0.08)",border:"1px solid rgba(251,113,133,0.18)",borderRadius:10,padding:"10px 16px",display:"flex",alignItems:"center",gap:12}}>
                    <AlertTriangle size={13} color="#fb7185" style={{flexShrink:0}}/>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.75)",flex:1}}>
                      <span style={{color:"#fda4af",fontWeight:700}}>{u.name}</span> (@{u.username}) — <span style={{color:"#fb7185",fontWeight:700}}>{u.failedAttempts} failed login attempt{u.failedAttempts!==1?"s":""}</span>. Account is currently <span style={{fontWeight:700}}>{u.status}</span>.
                    </span>
                    <button onClick={()=>toggleStatus(u)} className="btn" style={{padding:"5px 12px",fontSize:11,color:"#fbbf24",borderColor:"rgba(251,191,36,0.3)",flexShrink:0}}>
                      {u.status==="Suspended"?"Reactivate":"Suspend"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security feature grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
            {[
              {icon:"🔐",title:"Password Encryption",   status:"Active",   color:"#34d399", desc:"All passwords are hashed using bcrypt with salt rounds. No plaintext passwords stored."},
              {icon:"🚪",title:"Login / Logout System", status:"Active",   color:"#34d399", desc:"Session-based authentication with auto-logout after 30 minutes of inactivity."},
              {icon:"🛡️",title:"Failed Login Detection",status:"Active",   color:"#fbbf24", desc:"Accounts are automatically suspended after 5 consecutive failed login attempts."},
              {icon:"📲",title:"Two-Factor Auth (2FA)", status:"Optional", color:"#818cf8", desc:"TOTP-based 2FA available for all roles. Currently enabled for Admins by default."},
            ].map((f,i)=>(
              <div key={i} style={{background:`${f.color}0a`,border:`1px solid ${f.color}25`,borderRadius:14,padding:"18px 20px",display:"flex",gap:14}}>
                <div style={{width:46,height:46,borderRadius:12,background:`${f.color}15`,border:`1px solid ${f.color}28`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:20}}>{f.icon}</div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>{f.title}</span>
                    <span style={{fontSize:10,fontWeight:700,color:f.color,background:`${f.color}18`,border:`1px solid ${f.color}30`,borderRadius:999,padding:"2px 8px"}}>{f.status}</span>
                  </div>
                  <p style={{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.6}}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2FA status per user */}
          <div className="card">
            <div className="card-title">Two-Factor Authentication Status</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {users.map(u=>(
                <div key={u.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(255,255,255,0.02)",borderRadius:10,border:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:ROLE_COLORS[u.role].bg,border:`1px solid ${ROLE_COLORS[u.role].border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:ROLE_COLORS[u.role].c,flexShrink:0}}>
                    {u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </div>
                  <span style={{flex:1,fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.7)"}}>{u.name}</span>
                  <span className={ROLE_COLORS[u.role].chip} style={{fontSize:10}}>{u.role}</span>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:32,height:18,borderRadius:99,background:u.twoFA?"rgba(52,211,153,0.3)":"rgba(255,255,255,0.08)",border:`1px solid ${u.twoFA?"rgba(52,211,153,0.5)":"rgba(255,255,255,0.1)"}`,position:"relative",cursor:"pointer",transition:"background 0.2s"}}
                      onClick={()=>setUsers(p=>p.map(x=>x.id===u.id?{...x,twoFA:!x.twoFA}:x))}>
                      <div style={{position:"absolute",top:2,left:u.twoFA?14:2,width:14,height:14,borderRadius:"50%",background:u.twoFA?"#34d399":"rgba(255,255,255,0.3)",transition:"left 0.2s"}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:u.twoFA?"#34d399":"rgba(255,255,255,0.25)"}}>{u.twoFA?"2FA ON":"2FA OFF"}</span>
                  </div>
                  {u.failedAttempts>0&&<span style={{fontSize:11,color:"#fb7185",fontWeight:600}}>⚠ {u.failedAttempts} failed</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL: ADD/EDIT ══ */}
      {(modal==="add"||modal==="edit")&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:"16px"}}>
          <div className={userShake?"form-shake":""} style={{background:"#13131f",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:32,width:"100%",maxWidth:480}}>

            {/* Header */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontSize:18,fontWeight:700,color:"#fff"}}>{modal==="add"?"Add New User":"Edit User"}</h3>
              {Object.values(userErrors).some(Boolean)&&(
                <div style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.3)",borderRadius:10}}>
                  <span style={{fontSize:13}}>⚠️</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#fda4af"}}>Fill required fields</span>
                </div>
              )}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {/* Full Name */}
              <div>
                <label style={{fontSize:11,fontWeight:700,color:userErrors.name?"#fda4af":"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>
                  FULL NAME <span style={{color:"#fb7185"}}>*</span>
                </label>
                <input value={form.name}
                  onChange={e=>{
                    const v = e.target.value;
                    // Block digits — names only accept letters, spaces, hyphens, dots
                    if(/\d/.test(v)){ userClearErr("name"); setUserErrors(er=>({...er,nameNum:true})); setTimeout(()=>setUserErrors(er=>({...er,nameNum:false})),2000); return; }
                    setUserErrors(er=>({...er,nameNum:false}));
                    setForm(f=>({...f,name:v}));userClearErr("name");
                  }}
                  className={`inp${(userErrors.name||userErrors.nameNum)?" inp-err":""}`}
                  placeholder={userErrors.name?"Full name is required":"e.g. Maria Santos"}/>
                {userErrors.name&&<div className="err-msg"><span>⚠</span>Full name is required</div>}
                {userErrors.nameNum&&<div className="err-msg"><span>🚫</span>Numbers are not allowed in names</div>}
              </div>

              <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:12}}>
                {/* Username */}
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:userErrors.username?"#fda4af":"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>
                    USERNAME <span style={{color:"#fb7185"}}>*</span>
                  </label>
                  <input value={form.username}
                    onChange={e=>{setForm(f=>({...f,username:e.target.value}));userClearErr("username");}}
                    className={`inp${userErrors.username?" inp-err":""}`}
                    placeholder={userErrors.username?"Required":"msantos"}/>
                  {userErrors.username&&<div className="err-msg"><span>⚠</span>Username is required</div>}
                </div>
                {/* Email */}
                <div>
                  <label style={{fontSize:11,fontWeight:700,color:userErrors.email?"#fda4af":"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:6}}>
                    EMAIL <span style={{color:"#fb7185"}}>*</span>
                  </label>
                  <input value={form.email} type="email"
                    onChange={e=>{setForm(f=>({...f,email:e.target.value}));userClearErr("email");}}
                    className={`inp${userErrors.email?" inp-err":""}`}
                    placeholder={userErrors.email?"Required":"maria@email.com"}/>
                  {userErrors.email&&<div className="err-msg"><span>⚠</span>Email is required</div>}
                </div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:12}}>
                <FLD label="ROLE" ch={
                  <select value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value as URole}))} className="inp">
                    {["Admin","Manager","Staff"].map(r=><option key={r} value={r}>{r}</option>)}
                  </select>}/>
                <FLD label="STATUS" ch={
                  <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as UStatus}))} className="inp">
                    {["Active","Suspended","Disabled"].map(s=><option key={s} value={s}>{s}</option>)}
                  </select>}/>
              </div>

              <div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:"rgba(255,255,255,0.03)",borderRadius:10}}>
                <div style={{width:32,height:18,borderRadius:99,background:form.twoFA?"rgba(52,211,153,0.3)":"rgba(255,255,255,0.08)",border:`1px solid ${form.twoFA?"rgba(52,211,153,0.5)":"rgba(255,255,255,0.1)"}`,position:"relative",cursor:"pointer"}}
                  onClick={()=>setForm(f=>({...f,twoFA:!f.twoFA}))}>
                  <div style={{position:"absolute",top:2,left:form.twoFA?14:2,width:14,height:14,borderRadius:"50%",background:form.twoFA?"#34d399":"rgba(255,255,255,0.3)",transition:"left 0.2s"}}/>
                </div>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>Enable Two-Factor Authentication</span>
              </div>
            </div>

            <div style={{display:"flex",gap:10,marginTop:24}}>
              <button onClick={modal==="add"?saveAdd:saveEdit} className="btn-g" style={{flex:1}}>{modal==="add"?"Add User":"Save Changes"}</button>
              <button onClick={()=>{setModal(null);setUserErrors({});}} className="btn" style={{flex:1}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MODAL: DELETE ══ */}
      {modal==="delete"&&selected&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
          <div style={{background:"#13131f",border:"1px solid rgba(251,113,133,0.25)",borderRadius:20,padding:36,maxWidth:380,width:"90%",textAlign:"center"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
              <Trash2 size={22} color="#fb7185"/>
            </div>
            <h3 style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:8}}>Delete User?</h3>
            <p style={{color:"rgba(255,255,255,0.4)",fontSize:13,marginBottom:24,lineHeight:1.6}}>
              Remove <span style={{color:"#fda4af",fontWeight:700}}>{selected.name}</span> (@{selected.username})? This action cannot be undone.
            </p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={doDelete} className="btn-r" style={{flex:1}}>Yes, Delete</button>
              <button onClick={()=>setModal(null)} className="btn" style={{flex:1}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* ── AI FORECASTING HUB ───────────────────────────────────────────── */
const aiFeatItems = [
  {key:"predict",I:LineChartIcon,c:"#818cf8",bg:"rgba(129,140,248,0.1)",b:"rgba(129,140,248,0.2)",t:"Predict Sales",d:"Estimates future daily, monthly, or yearly sales based on previous sales data.",h:"Click to open sales forecasting with AI-powered predictions and trend analysis."},
  {key:"demand",I:Package,c:"#34d399",bg:"rgba(52,211,153,0.1)",b:"rgba(52,211,153,0.2)",t:"Demand Forecasting",d:"Predicts how many products customers will buy.",h:"Click to see predicted demand per product, trend graphs, and AI recommendations."},
  {key:"inventory",I:Boxes,c:"#fbbf24",bg:"rgba(251,191,36,0.1)",b:"rgba(251,191,36,0.2)",t:"Inventory Planning",d:"Forecasts which products will run out soon.",h:"Click to see restocking recommendations, stock vs demand charts, and urgent alerts."},
  {key:"profit",I:DollarSign,c:"#38bdf8",bg:"rgba(56,189,248,0.1)",b:"rgba(56,189,248,0.2)",t:"Profit Forecast",d:"Predicts future profit or loss by analyzing expenses, pricing, and sales trends.",h:"Click to see revenue, expenses, and net profit forecasts with AI growth insights."},
  {key:"expense",I:Receipt,c:"#fb7185",bg:"rgba(251,113,133,0.1)",b:"rgba(251,113,133,0.2)",t:"Expense Prediction",d:"Estimates future business costs like electricity, supplies, or employee salaries.",h:"Click to see predicted rent, salaries, utilities, supplies, and AI cost insights."},
  {key:"customer",I:Users,c:"#a78bfa",bg:"rgba(167,139,250,0.1)",b:"rgba(167,139,250,0.2)",t:"Customer Behavior Prediction",d:"Predicts what customers will likely buy next based on their past purchases.",h:"Click to explore purchase heatmaps, loyalty rankings, and AI behavioral insights."},
];

const AIHub = ({ onOpen }: { onOpen: (key: string) => void }) => (
  <div>
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
      <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,rgba(99,102,241,0.28),rgba(139,92,246,0.18))",border:"1px solid rgba(139,92,246,0.28)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <BrainCircuit size={20} color="#a78bfa"/>
      </div>
      <div>
        <h2 style={{fontSize:17,fontWeight:700,color:"#fff"}}>AI Forecasting & Predictions</h2>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:2}}>Powered by advanced machine learning models — click a card to explore</p>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:14}}>
      {aiFeatItems.map(item=>(
        <div key={item.key} className="ai-card" onClick={()=>onOpen(item.key)} style={{position:"relative"}}>
          {(item.key==="predict"||item.key==="demand"||item.key==="inventory"||item.key==="profit"||item.key==="expense"||item.key==="customer") && (
            <div style={{position:"absolute",top:12,right:12,background:"rgba(129,140,248,0.2)",border:"1px solid rgba(129,140,248,0.3)",borderRadius:999,padding:"2px 10px",fontSize:10,color:"#818cf8",fontWeight:700,letterSpacing:"0.04em"}}>LIVE</div>
          )}
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{width:36,height:36,borderRadius:10,background:item.bg,border:`1px solid ${item.b}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <item.I size={18} color={item.c}/>
            </div>
            <div>
              <h3 style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:5}}>{item.t}</h3>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.55,marginBottom:item.h?7:0}}>{item.d}</p>
              {item.h&&<div style={{fontSize:11,color:`${item.c}bb`,background:item.bg,border:`1px solid ${item.b}`,borderRadius:8,padding:"6px 10px",lineHeight:1.4}}>{item.h}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── AUTH PAGE ────────────────────────────────────────────────────── */
const AuthPage = ({onAuth}:{onAuth:(name:string)=>void}) => {
  const [mode, setMode]         = useState<"login"|"signup">("login");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [pass, setPass]         = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);
  const [fadeMode, setFadeMode] = useState(false);

  const switchMode = (m:"login"|"signup") => {
    setFadeMode(true);
    setTimeout(()=>{setMode(m);setFadeMode(false);},220);
  };

  const submit = () => {
    if(!name||(mode==="signup"&&!email)||!pass){setShake(true);setTimeout(()=>setShake(false),500);return;}
    setLoading(true);
    setTimeout(()=>{setLoading(false);onAuth(name);},1200);
  };

  // Floating orbs data (static, memoized by position)
  const orbs = [
    {w:320,h:320,top:"8%", left:"12%", c:"rgba(184,134,11,0.07)", dur:8},
    {w:220,h:220,top:"55%",left:"5%",  c:"rgba(212,175,55,0.05)", dur:11},
    {w:160,h:160,top:"20%",left:"68%", c:"rgba(255,215,0,0.04)",  dur:7},
    {w:280,h:280,top:"65%",left:"55%", c:"rgba(184,134,11,0.06)", dur:13},
    {w:120,h:120,top:"80%",left:"80%", c:"rgba(212,175,55,0.08)", dur:9},
  ];

  const G_AUTH = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
    @keyframes authFadeIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes authSlideL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
    @keyframes authSlideR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
    @keyframes floatOrb{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-28px) scale(1.04)}}
    @keyframes scanLine{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
    @keyframes shimmerGold{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes spinRingR{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
    @keyframes logoGlow{0%,100%{filter:drop-shadow(0 0 12px rgba(212,175,55,0.4))}50%{filter:drop-shadow(0 0 28px rgba(212,175,55,0.8))}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes gridPulse{0%,100%{opacity:0.3}50%{opacity:0.6}}
    .auth-inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#e2e8f0;padding:14px 46px 14px 16px;font-size:14px;outline:none;font-family:'Inter',sans-serif;transition:all 0.2s;box-sizing:border-box;}
    .auth-inp:focus{border-color:rgba(212,175,55,0.5);background:rgba(212,175,55,0.04);box-shadow:0 0 0 3px rgba(212,175,55,0.08);}
    .auth-inp::placeholder{color:rgba(255,255,255,0.2);}
    .auth-social{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);cursor:pointer;transition:all 0.2s;font-size:22px;}
    .auth-social:hover{background:rgba(255,255,255,0.09);border-color:rgba(255,255,255,0.18);transform:translateY(-2px);}
  `;

  const isLogin = mode === "login";
  const authW = useW();
  const authMob = authW <= 640;

  return (
    <div style={{
      position:"fixed",inset:0,background:"#080812",
      display:"flex",flexDirection:authMob?"column":"row",
      overflow:authMob?"auto":"hidden",fontFamily:"'Inter',sans-serif",
    }}>
      <style>{G_AUTH}</style>

      {/* ── Animated background grid ── */}
      <div style={{position:"fixed",inset:0,backgroundImage:"linear-gradient(rgba(212,175,55,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.03) 1px,transparent 1px)",backgroundSize:"60px 60px",animation:"gridPulse 4s ease infinite",pointerEvents:"none"}}/>

      {/* ── Floating orbs ── */}
      {orbs.map((o,i)=>(
        <div key={i} style={{position:"fixed",top:o.top,left:o.left,width:o.w,height:o.h,borderRadius:"50%",background:o.c,filter:"blur(60px)",animation:`floatOrb ${o.dur}s ease-in-out infinite`,animationDelay:`${i*1.3}s`,pointerEvents:"none"}}/>
      ))}

      {/* ── Scan line ── */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.15),transparent)",animation:"scanLine 8s linear infinite",pointerEvents:"none"}}/>

      {/* ══ LEFT PANEL — hidden on mobile ══ */}
      {!authMob&&<div style={{
        flex:1, position:"relative", overflow:"hidden",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"flex 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* City skyline gradient background */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#0a0a1a 0%,#0d1a2e 40%,#0a1520 70%,#080d18 100%)"}}/>
        {/* Subtle building silhouettes via gradient layers */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"45%",background:"linear-gradient(180deg,transparent 0%,rgba(10,15,30,0.95) 100%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"30%",background:"linear-gradient(180deg,transparent 0%,#050510 100%)"}}/>
        {/* City silhouette SVG */}
        <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",opacity:0.18}} viewBox="0 0 800 200" preserveAspectRatio="none">
          <rect x="0" y="80" width="40" height="120" fill="#d4af37"/>
          <rect x="10" y="60" width="20" height="20" fill="#d4af37"/>
          <rect x="50" y="110" width="30" height="90" fill="#d4af37"/>
          <rect x="90" y="50" width="50" height="150" fill="#d4af37"/>
          <rect x="100" y="30" width="10" height="25" fill="#d4af37"/>
          <rect x="100" y="20" width="10" height="12" fill="#d4af37"/>
          <rect x="150" y="90" width="35" height="110" fill="#d4af37"/>
          <rect x="195" y="40" width="55" height="160" fill="#d4af37"/>
          <rect x="218" y="20" width="10" height="24" fill="#d4af37"/>
          <rect x="260" y="70" width="40" height="130" fill="#d4af37"/>
          <rect x="310" y="100" width="30" height="100" fill="#d4af37"/>
          <rect x="350" y="55" width="60" height="145" fill="#d4af37"/>
          <rect x="370" y="30" width="20" height="28" fill="#d4af37"/>
          <rect x="420" y="85" width="35" height="115" fill="#d4af37"/>
          <rect x="465" y="45" width="50" height="155" fill="#d4af37"/>
          <rect x="487" y="22" width="8" height="26" fill="#d4af37"/>
          <rect x="525" y="75" width="40" height="125" fill="#d4af37"/>
          <rect x="575" y="95" width="30" height="105" fill="#d4af37"/>
          <rect x="615" y="50" width="55" height="150" fill="#d4af37"/>
          <rect x="635" y="28" width="12" height="24" fill="#d4af37"/>
          <rect x="680" y="80" width="38" height="120" fill="#d4af37"/>
          <rect x="728" y="60" width="45" height="140" fill="#d4af37"/>
          <rect x="748" y="35" width="8" height="28" fill="#d4af37"/>
          <rect x="0" y="140" width="800" height="60" fill="#d4af37" opacity="0.5"/>
        </svg>

        {/* Content */}
        <div style={{position:"relative",zIndex:2,textAlign:"center",padding:"0 48px",animation:"authSlideL 0.7s ease both"}}>
          {/* Logo */}
          <div style={{position:"relative",width:100,height:100,margin:"0 auto 28px",animation:"logoGlow 3s ease infinite"}}>
            {/* Outer spinning ring */}
            <div style={{position:"absolute",inset:-8,borderRadius:"50%",border:"1.5px solid transparent",borderTopColor:"rgba(212,175,55,0.6)",borderRightColor:"rgba(212,175,55,0.2)",animation:"spinRing 3s linear infinite"}}/>
            <div style={{position:"absolute",inset:-14,borderRadius:"50%",border:"1px solid transparent",borderBottomColor:"rgba(212,175,55,0.3)",borderLeftColor:"rgba(212,175,55,0.1)",animation:"spinRingR 5s linear infinite"}}/>
            {/* Logo */}
            <div style={{width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",boxShadow:"0 0 40px rgba(212,175,55,0.3)"}}>
              <BaryalyticsLogo size={100}/>
            </div>
          </div>

          {isLogin ? (
            <>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:38,fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16}}>
                <span style={{display:"block",fontSize:22,fontWeight:400,fontStyle:"italic",color:"rgba(255,255,255,0.7)",marginBottom:4}}>Hello,</span>
                WELCOME TO
              </div>
              <div style={{
                fontSize:32,fontWeight:900,letterSpacing:"0.06em",marginBottom:20,
                background:"linear-gradient(90deg,#b8860b,#d4af37,#f0c040,#d4af37,#b8860b)",
                backgroundSize:"200% auto",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                animation:"shimmerGold 3s linear infinite",
              }}>BARYALYTICS</div>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.7,maxWidth:280,margin:"0 auto 36px"}}>
                Don't have an account yet?<br/>Join us and get started today!
              </p>
              <button onClick={()=>switchMode("signup")} style={{
                background:"rgba(212,175,55,0.1)",border:"1.5px solid rgba(212,175,55,0.35)",
                borderRadius:12,padding:"13px 40px",color:"#d4af37",fontSize:14,fontWeight:700,
                cursor:"pointer",letterSpacing:"0.05em",transition:"all 0.2s",fontFamily:"'Inter',sans-serif",
              }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(212,175,55,0.18)";(e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 20px rgba(212,175,55,0.2)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(212,175,55,0.1)";(e.currentTarget as HTMLButtonElement).style.boxShadow="none";}}
              >Sign Up →</button>
            </>
          ) : (
            <>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:38,fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:16}}>
                <span style={{display:"block",fontSize:22,fontWeight:400,fontStyle:"italic",color:"rgba(255,255,255,0.7)",marginBottom:4}}>Hello,</span>
                FRIEND!
              </div>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.7,maxWidth:280,margin:"0 auto 36px"}}>
                Already have an account?<br/>Login here to access your dashboard.
              </p>
              <button onClick={()=>switchMode("login")} style={{
                background:"rgba(212,175,55,0.1)",border:"1.5px solid rgba(212,175,55,0.35)",
                borderRadius:12,padding:"13px 40px",color:"#d4af37",fontSize:14,fontWeight:700,
                cursor:"pointer",letterSpacing:"0.05em",transition:"all 0.2s",fontFamily:"'Inter',sans-serif",
              }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(212,175,55,0.18)";(e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 20px rgba(212,175,55,0.2)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(212,175,55,0.1)";(e.currentTarget as HTMLButtonElement).style.boxShadow="none";}}
              >← Login</button>
            </>
          )}

          {/* Decorative corner accents */}
          <div style={{position:"absolute",top:20,left:20,width:30,height:30,borderTop:"2px solid rgba(212,175,55,0.3)",borderLeft:"2px solid rgba(212,175,55,0.3)",borderRadius:"3px 0 0 0"}}/>
          <div style={{position:"absolute",top:20,right:20,width:30,height:30,borderTop:"2px solid rgba(212,175,55,0.3)",borderRight:"2px solid rgba(212,175,55,0.3)",borderRadius:"0 3px 0 0"}}/>
          <div style={{position:"absolute",bottom:20,left:20,width:30,height:30,borderBottom:"2px solid rgba(212,175,55,0.3)",borderLeft:"2px solid rgba(212,175,55,0.3)",borderRadius:"0 0 0 3px"}}/>
          <div style={{position:"absolute",bottom:20,right:20,width:30,height:30,borderBottom:"2px solid rgba(212,175,55,0.3)",borderRight:"2px solid rgba(212,175,55,0.3)",borderRadius:"0 0 3px 0"}}/>
        </div>
      </div>}

      {/* ══ RIGHT PANEL — Form ══ */}
      <div style={{
        width:authMob?"100%":"48%",
        minWidth:authMob?"unset":"420px",
        minHeight:authMob?"100vh":"unset",
        position:"relative",
        background:"rgba(12,12,24,0.96)",
        borderLeft:authMob?"none":"1px solid rgba(212,175,55,0.12)",
        display:"flex",alignItems:"center",justifyContent:"center",
        overflow:"hidden",
      }}>
        {/* Glass shimmer top edge */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent)"}}/>
        {/* Subtle inner glow */}
        <div style={{position:"absolute",top:0,right:0,width:300,height:300,background:"radial-gradient(circle,rgba(212,175,55,0.04) 0%,transparent 70%)",pointerEvents:"none"}}/>

        <div style={{
          width:"100%",maxWidth:420,padding:authMob?"24px 24px 40px":"0 48px",
          opacity:fadeMode?0:1,transform:fadeMode?"translateY(10px)":"translateY(0)",
          transition:"opacity 0.22s ease,transform 0.22s ease",
          animation:"authSlideR 0.7s ease both",
        }}>
          {/* Form header */}
          <div style={{marginBottom:authMob?24:36,textAlign:"center"}}>
            {/* Mobile: show mini logo since left panel is hidden */}
            {authMob&&(
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:20}}>
                <div style={{width:44,height:44,borderRadius:"50%",overflow:"hidden",boxShadow:"0 0 16px rgba(212,175,55,0.35)"}}>
                  <BaryalyticsLogo size={44}/>
                </div>
                <div style={{
                  fontSize:20,fontWeight:900,letterSpacing:"0.06em",
                  background:"linear-gradient(90deg,#b8860b,#d4af37,#f0c040)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                }}>BARYALYTICS</div>
              </div>
            )}
            <div style={{
              fontSize:authMob?28:36,fontWeight:800,color:"#fff",letterSpacing:"-0.02em",marginBottom:6,
              fontFamily:"'Playfair Display',serif",
            }}>{isLogin?"Login":"Sign up"}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.3)"}}>
              {isLogin?"Welcome back — enter your credentials":"Create your Baryalytics account"}
            </div>
            {/* Underline accent */}
            <div style={{width:48,height:3,background:"linear-gradient(90deg,#b8860b,#d4af37)",borderRadius:99,margin:"14px auto 0",boxShadow:"0 0 10px rgba(212,175,55,0.4)"}}/>
          </div>

          {/* Fields */}
          <div style={{display:"flex",flexDirection:"column",gap:18,animation:`shake ${shake?"0.4s ease":"0s"}`}}>
            {/* Name */}
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.08em",marginBottom:7,display:"block"}}>NAME</label>
              <div style={{position:"relative"}}>
                <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} className="auth-inp" placeholder="Enter your name"/>
                <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.2)",pointerEvents:"none",fontSize:16}}>👤</div>
              </div>
            </div>

            {/* Email — signup only */}
            {!isLogin&&(
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.08em",marginBottom:7,display:"block"}}>EMAIL</label>
                <div style={{position:"relative"}}>
                  <input value={email} onChange={e=>setEmail(e.target.value)} className="auth-inp" placeholder="Enter your email" type="email"/>
                  <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.2)",pointerEvents:"none",fontSize:16}}>✉️</div>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.08em",marginBottom:7,display:"block"}}>PASSWORD</label>
              <div style={{position:"relative"}}>
                <input value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} className="auth-inp" placeholder="Enter your password" type={showPass?"text":"password"}/>
                <button onClick={()=>setShowPass(v=>!v)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.3)",fontSize:16,padding:0}}>
                  {showPass?"🙈":"🔒"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",userSelect:"none"}}>
                <div onClick={()=>setRemember(v=>!v)} style={{width:18,height:18,borderRadius:5,border:`1.5px solid ${remember?"rgba(212,175,55,0.7)":"rgba(255,255,255,0.2)"}`,background:remember?"rgba(212,175,55,0.15)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.15s"}}>
                  {remember&&<span style={{fontSize:11,color:"#d4af37",fontWeight:700}}>✓</span>}
                </div>
                <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>Remember me</span>
              </label>
              <button style={{background:"none",border:"none",color:"rgba(212,175,55,0.7)",fontSize:12,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>Forgot Password?</button>
            </div>

            {/* Submit button */}
            <button onClick={submit} style={{
              width:"100%",padding:"15px",
              background:loading
                ?"rgba(212,175,55,0.15)"
                :"linear-gradient(135deg,#b8860b,#d4af37,#c9a227)",
              border:"none",borderRadius:12,
              color:loading?"rgba(212,175,55,0.6)":"#0a0a0a",
              fontSize:15,fontWeight:800,cursor:loading?"not-allowed":"pointer",
              letterSpacing:"0.04em",fontFamily:"'Inter',sans-serif",
              boxShadow:loading?"none":"0 4px 24px rgba(212,175,55,0.3)",
              transition:"all 0.2s",position:"relative",overflow:"hidden",
            }}
              onMouseEnter={e=>{if(!loading){(e.currentTarget as HTMLButtonElement).style.boxShadow="0 6px 32px rgba(212,175,55,0.5)";(e.currentTarget as HTMLButtonElement).style.transform="translateY(-1px)";}}}
              onMouseLeave={e=>{if(!loading){(e.currentTarget as HTMLButtonElement).style.boxShadow="0 4px 24px rgba(212,175,55,0.3)";(e.currentTarget as HTMLButtonElement).style.transform="translateY(0)";}}}
            >
              {loading
                ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    <span style={{display:"inline-block",width:16,height:16,border:"2px solid rgba(212,175,55,0.3)",borderTopColor:"#d4af37",borderRadius:"50%",animation:"spinRing 0.6s linear infinite"}}/>
                    Authenticating…
                  </span>
                : isLogin ? "Login →" : "Create Account →"
              }
            </button>

            {/* Divider */}
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.25)"}}>or continue with</span>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/>
            </div>

            {/* Social buttons */}
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              {[
                {icon:"G",bg:"linear-gradient(135deg,#4285f4,#34a853,#fbbc05,#ea4335)",label:"Google"},
                {icon:"f",bg:"#1877f2",label:"Facebook"},
                {icon:"𝕏",bg:"#000",label:"X (Twitter)"},
              ].map(s=>(
                <button key={s.label} className="auth-social" title={`Continue with ${s.label}`}>
                  <span style={{fontWeight:900,fontSize:17,background:s.bg,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Switch mode link */}
          <div style={{textAlign:"center",marginTop:28}}>
            <span style={{fontSize:13,color:"rgba(255,255,255,0.3)"}}>
              {isLogin?"Don't have an account? ":"Already have an account? "}
            </span>
            <button onClick={()=>switchMode(isLogin?"signup":"login")} style={{background:"none",border:"none",color:"#d4af37",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Inter',sans-serif",textDecoration:"underline",textUnderlineOffset:3}}>
              {isLogin?"Sign up":"Login"}
            </button>
          </div>

          {/* Version tag */}
          <div style={{textAlign:"center",marginTop:24,fontSize:10,color:"rgba(255,255,255,0.12)",letterSpacing:"0.1em"}}>BARYALYTICS v2.0 · 2026</div>
        </div>
      </div>
    </div>
  );
};

/* ── APP ROOT ─────────────────────────────────────────────────────── */
/* ── NOTIFICATION DATA & PANEL ───────────────────────────────────── */
type NotifCat = "delivery"|"stock"|"finance"|"security"|"user"|"alert"|"system";
interface Notif {
  id:number; cat:NotifCat; title:string; body:string; time:string; read:boolean; urgent?:boolean;
}

const NOTIF_META: Record<NotifCat,{icon:string; color:string; bg:string; label:string}> = {
  delivery: {icon:"🚚", color:"#38bdf8", bg:"rgba(56,189,248,0.12)",  label:"Delivery"},
  stock:    {icon:"📦", color:"#fbbf24", bg:"rgba(251,191,36,0.12)",  label:"Stock"},
  finance:  {icon:"💰", color:"#34d399", bg:"rgba(52,211,153,0.12)",  label:"Finance"},
  security: {icon:"🔐", color:"#fb7185", bg:"rgba(251,113,133,0.12)", label:"Security"},
  user:     {icon:"👤", color:"#a78bfa", bg:"rgba(167,139,250,0.12)", label:"User"},
  alert:    {icon:"⚠️", color:"#f97316", bg:"rgba(249,115,22,0.12)",  label:"Alert"},
  system:   {icon:"⚙️", color:"#818cf8", bg:"rgba(129,140,248,0.12)", label:"System"},
};

const INIT_NOTIFS: Notif[] = [
  {id:1,  cat:"delivery", urgent:true,  read:false, time:"2m ago",   title:"Delivery Arriving Soon",         body:"Kenzo supplier truck is 15 minutes away. Estimated arrival: 10:45 AM today."},
  {id:2,  cat:"stock",    urgent:true,  read:false, time:"8m ago",   title:"Low Stock Alert — Coca-Cola 1.5L",body:"Carlo Mendoza requested restock of 200 units. Current stock: 12 units (critical)."},
  {id:3,  cat:"user",     urgent:true,  read:false, time:"14m ago",  title:"Access Control Request",          body:"Ben Torres is requesting Manager-level access to the Financial Dashboard. Pending approval."},
  {id:4,  cat:"stock",    urgent:false, read:false, time:"22m ago",  title:"Restock Request — Running Shoes", body:"Ana Reyes submitted a restock request for 75 units of Running Shoes (Size 8–11)."},
  {id:5,  cat:"finance",  urgent:false, read:false, time:"35m ago",  title:"Budget Threshold Reached",        body:"January expense spending has reached 88% of the ₱320,000 monthly budget limit."},
  {id:6,  cat:"delivery", urgent:false, read:false, time:"1h ago",   title:"Delivery Confirmed — Takoyuki",   body:"Takoyuki's Oil shipment (30 units) has been confirmed and is out for delivery today."},
  {id:7,  cat:"security", urgent:true,  read:false, time:"2h ago",   title:"Suspicious Login Detected",       body:"Liza Pangilinan's account triggered 4 failed login attempts. Account auto-suspended."},
  {id:8,  cat:"user",     urgent:false, read:false, time:"3h ago",   title:"New User Registration",           body:"Rosa Garcia has been re-activated by admin Juan dela Cruz. Role assigned: Staff."},
  {id:9,  cat:"finance",  urgent:false, read:true,  time:"5h ago",   title:"Monthly Report Ready",            body:"The January 2026 Profit & Loss summary is ready to download from the Finance dashboard."},
  {id:10, cat:"stock",    urgent:false, read:true,  time:"6h ago",   title:"Inventory Audit Complete",        body:"Scheduled inventory count finished. 3 items flagged with discrepancies — review needed."},
  {id:11, cat:"alert",    urgent:true,  read:true,  time:"8h ago",   title:"Flash Sale Spike Detected",       body:"Sales volume increased 340% in the last hour — potential flash sale or data entry error."},
  {id:12, cat:"system",   urgent:false, read:true,  time:"1d ago",   title:"System Update Completed",         body:"Baryalytics v2.0.1 deployed successfully. New: improved chart rendering & bug fixes."},
  {id:13, cat:"delivery", urgent:false, read:true,  time:"1d ago",   title:"Mel Chor Delivery Completed",     body:"Bebangs Electronics Phone Case shipment (25 units) has been received and logged."},
];

const NotifPanel = ({onClose}:{onClose:()=>void}) => {
  const [notifs, setNotifs] = useState<Notif[]>(INIT_NOTIFS);
  const [filter, setFilter] = useState<"all"|"unread"|"urgent">("all");

  const markAll  = ()=>setNotifs(n=>n.map(x=>({...x,read:true})));
  const markOne  = (id:number)=>setNotifs(n=>n.map(x=>x.id===id?{...x,read:true}:x));
  const dismiss  = (id:number)=>setNotifs(n=>n.filter(x=>x.id!==id));

  const shown = notifs.filter(n=>
    filter==="all"    ? true :
    filter==="unread" ? !n.read :
    n.urgent
  );
  const unreadCount = notifs.filter(n=>!n.read).length;

  return ReactDOM.createPortal(
    <div style={{position:"fixed",inset:0,zIndex:9990,display:"flex",justifyContent:"flex-end"}} onMouseDown={onClose}>
      {/* Backdrop */}
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.35)",backdropFilter:"blur(2px)"}}/>

      {/* Panel */}
      <div
        style={{
          position:"relative",zIndex:1,
          width:400,maxWidth:"96vw",height:"100vh",
          background:"#0f0f1e",
          borderLeft:"1px solid rgba(255,255,255,0.08)",
          display:"flex",flexDirection:"column",
          boxShadow:"-20px 0 60px rgba(0,0,0,0.5)",
          animation:"notifSlideIn 0.25s cubic-bezier(0.4,0,0.2,1) both",
        }}
        onMouseDown={e=>e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div style={{padding:"20px 20px 0",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:10,background:"rgba(129,140,248,0.12)",border:"1px solid rgba(129,140,248,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Bell size={16} color="#818cf8"/>
              </div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Notifications</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{unreadCount} unread</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <button onClick={markAll} style={{fontSize:11,color:"rgba(255,255,255,0.35)",background:"none",border:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif",padding:"4px 8px",borderRadius:6,transition:"color 0.15s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#818cf8")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.35)")}>
                Mark all read
              </button>
              <button onClick={onClose} style={{width:28,height:28,borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",color:"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✕</button>
            </div>
          </div>
          {/* Filter tabs */}
          <div style={{display:"flex",gap:4,paddingBottom:1}}>
            {(["all","unread","urgent"] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:"6px 14px",borderRadius:"8px 8px 0 0",border:"none",cursor:"pointer",
                fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.05em",
                textTransform:"capitalize",transition:"all 0.15s",
                background:filter===f?"rgba(129,140,248,0.15)":"transparent",
                color:filter===f?"#818cf8":"rgba(255,255,255,0.3)",
                borderBottom:filter===f?"2px solid #818cf8":"2px solid transparent",
              }}>{f==="all"?`All (${notifs.length})`:f==="unread"?`Unread (${unreadCount})`:`Urgent (${notifs.filter(n=>n.urgent).length})`}</button>
            ))}
          </div>
        </div>

        {/* ── Notification list ── */}
        <div style={{flex:1,overflowY:"auto",padding:"8px 0"}}>
          {shown.length===0&&(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 24px",textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:12}}>🔔</div>
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.4)"}}>All caught up!</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",marginTop:4}}>No {filter==="all"?"":filter} notifications right now.</div>
            </div>
          )}
          {shown.map((n,i)=>{
            const m = NOTIF_META[n.cat];
            return (
              <div key={n.id} style={{
                position:"relative",
                padding:"14px 16px",
                borderBottom:"1px solid rgba(255,255,255,0.04)",
                background:n.read?"transparent":"rgba(255,255,255,0.018)",
                transition:"background 0.15s",
                animation:`notifRow 0.3s ${i*0.04}s ease both`,
                cursor:"pointer",
              }}
                onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.03)"}
                onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background=n.read?"transparent":"rgba(255,255,255,0.018)"}
                onClick={()=>markOne(n.id)}
              >
                {/* Unread indicator */}
                {!n.read&&<div style={{position:"absolute",left:6,top:"50%",transform:"translateY(-50%)",width:4,height:4,borderRadius:"50%",background:"#818cf8",boxShadow:"0 0 6px #818cf8"}}/>}

                <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  {/* Icon */}
                  <div style={{
                    width:38,height:38,borderRadius:11,flexShrink:0,
                    background:m.bg,border:`1px solid ${m.color}28`,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,
                    position:"relative",
                  }}>
                    {(n as any).icon||m.icon}
                    {n.urgent&&!n.read&&(
                      <div style={{position:"absolute",top:-3,right:-3,width:10,height:10,borderRadius:"50%",background:"#fb7185",border:"2px solid #0f0f1e",animation:"urgentPulse 1.5s ease infinite"}}/>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:3}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:12,fontWeight:700,color:n.read?"rgba(255,255,255,0.6)":"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:200}}>{n.title}</span>
                        {n.urgent&&<span style={{fontSize:9,fontWeight:800,color:"#fb7185",background:"rgba(251,113,133,0.12)",border:"1px solid rgba(251,113,133,0.2)",borderRadius:999,padding:"1px 6px",flexShrink:0,letterSpacing:"0.06em"}}>URGENT</span>}
                      </div>
                      <button onClick={e=>{e.stopPropagation();dismiss(n.id);}} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.18)",fontSize:14,padding:0,flexShrink:0,lineHeight:1,transition:"color 0.12s"}}
                        onMouseEnter={e=>(e.currentTarget.style.color="#fb7185")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.18)")}>✕</button>
                    </div>
                    <p style={{fontSize:11,color:"rgba(255,255,255,0.38)",lineHeight:1.55,margin:"0 0 6px"}}>{n.body}</p>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:10,fontWeight:700,color:m.color,background:m.bg,border:`1px solid ${m.color}20`,borderRadius:999,padding:"2px 8px"}}>{m.label}</span>
                      <span style={{fontSize:10,color:"rgba(255,255,255,0.22)"}}>{n.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:8}}>
          <button style={{flex:1,padding:"9px",background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.2)",borderRadius:10,color:"#818cf8",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",transition:"all 0.15s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(129,140,248,0.2)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(129,140,248,0.1)";}}
          >View All Notifications</button>
          <button onClick={()=>setNotifs(n=>n.filter(x=>!x.read))} style={{padding:"9px 14px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,color:"rgba(255,255,255,0.35)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",transition:"all 0.15s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.08)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="rgba(255,255,255,0.04)";}}
          >Clear Read</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ── SETTINGS PAGE ────────────────────────────────────────────────── */
const SettingsPage = ({authName, onNameChange, appColor, setAppColor, isDark, setIsDark}:{authName:string; onNameChange:(n:string)=>void; appColor:string; setAppColor:(c:string)=>void; isDark:boolean; setIsDark:(v:boolean)=>void}) => {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState<string|null>(null);

  // Section 1 — Profile
  const [pName,    setPName]    = useState(authName);
  const [pEmail,   setPEmail]   = useState("juan.delacruz@baryalytics.ph");
  const [pPhone,   setPPhone]   = useState("+63 912 345 6789");
  const [pPic,     setPPic]     = useState<string|null>(null);

  // Section 2 — Business
  const [bName,    setBName]    = useState("Baryalytics Store");
  const [bAddr,    setBAddr]    = useState("123 Rizal St., Quezon City, Metro Manila");
  const [bPhone,   setBPhone]   = useState("+63 2 8888 0000");
  const [bEmail,   setBEmail]   = useState("info@baryalytics.ph");
  const [bTIN,     setBTIN]     = useState("123-456-789-000");

  // Section 3 — System Prefs
  const [currency,   setCurrency]   = useState("PHP ₱");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12-hour");
  const [timezone,   setTimezone]   = useState("Asia/Manila (UTC+8)");

  // Section 4 — Notifications
  const [nLowStock, setNLowStock]   = useState(true);
  const [nExpiry,   setNExpiry]     = useState(true);
  const [nDelivery, setNDelivery]   = useState(true);
  const [nSales,    setNSales]      = useState(false);

  // Section 5 — Security
  const [maxLogin,   setMaxLogin]   = useState("5");
  const [sessionTO,  setSessionTO]  = useState("30 minutes");
  const [twoFA,      setTwoFA]      = useState(false);
  const [newPw,      setNewPw]      = useState("");
  const [confPw,     setConfPw]     = useState("");

  // Section 6 — Backup (static display + actions)
  const [lastBackup] = useState("March 8, 2026 · 11:45 PM");
  const [backupSize] = useState("4.2 MB");

  // Section 7 — Appearance (state lives in App, passed via props)
  const [layout,     setLayout]     = useState("Default");

  // Section 8 — Defaults
  const [taxRate,    setTaxRate]    = useState("12");
  const [margin,     setMargin]     = useState("30");
  const [lowStockTh, setLowStockTh] = useState("20");

  const showSaved = (msg:string) => { setSaved(msg); setTimeout(()=>setSaved(null),2200); };

  const sections = [
    {id:"profile",    icon:"👤", label:"Profile",        sub:"Personal info"},
    {id:"business",   icon:"🏢", label:"Business",       sub:"Store details"},
    {id:"system",     icon:"⚙️", label:"System Prefs",   sub:"Formats & timezone"},
    {id:"notifs",     icon:"🔔", label:"Notifications",  sub:"Alerts & toggles"},
    {id:"security",   icon:"🔐", label:"Security",       sub:"Password & 2FA"},
    {id:"backup",     icon:"💾", label:"Backup",         sub:"Data protection"},
    {id:"appearance", icon:"🎨", label:"Appearance",     sub:"Theme & layout"},
    {id:"defaults",   icon:"📋", label:"Defaults",       sub:"Tax & margins"},
  ];

  const PALETTE = [
    {hex:"#34d399",name:"Emerald"},
    {hex:"#38bdf8",name:"Sky"},
    {hex:"#818cf8",name:"Indigo"},
    {hex:"#a78bfa",name:"Violet"},
    {hex:"#fb7185",name:"Rose"},
    {hex:"#fbbf24",name:"Amber"},
    {hex:"#f97316",name:"Orange"},
    {hex:"#e879f9",name:"Fuchsia"},
    {hex:"#f43f5e",name:"Red"},
    {hex:"#06b6d4",name:"Cyan"},
    {hex:"#d4af37",name:"Gold"},
    {hex:"#84cc16",name:"Lime"},
  ];

  const Toggle = ({on,set}:{on:boolean;set:(v:boolean)=>void}) => (
    <div onClick={()=>set(!on)} style={{width:44,height:24,borderRadius:99,background:on?"rgba(52,211,153,0.25)":"rgba(255,255,255,0.07)",border:`1.5px solid ${on?"rgba(52,211,153,0.5)":"rgba(255,255,255,0.12)"}`,position:"relative",cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
      <div style={{position:"absolute",top:3,left:on?20:3,width:16,height:16,borderRadius:"50%",background:on?"#34d399":"rgba(255,255,255,0.3)",transition:"left 0.2s,background 0.2s",boxShadow:on?"0 0 8px rgba(52,211,153,0.5)":"none"}}/>
    </div>
  );

  const Field = ({label,ch,children}:{label:string;ch?:React.ReactNode;children?:React.ReactNode}) => (
    <div>
      <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",display:"block",marginBottom:7}}>{label}</label>
      {ch||children}
    </div>
  );

  const SInp = ({value,onChange,placeholder,type="text"}:{value:string;onChange:(v:string)=>void;placeholder?:string;type?:string}) => (
    <input value={value} onChange={e=>onChange(e.target.value)} type={type} placeholder={placeholder} className="inp" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:11}}/>
  );

  const SSel = ({value,onChange,options}:{value:string;onChange:(v:string)=>void;options:string[]}) => (
    <select value={value} onChange={e=>onChange(e.target.value)} className="inp" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:11}}>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );

  const Card = ({title,icon,color="#818cf8",children}:{title:string;icon:string;color?:string;children?:React.ReactNode}) => (
    <div className="card fu1" style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <div style={{width:36,height:36,borderRadius:10,background:`${color}18`,border:`1px solid ${color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{icon}</div>
        <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{title}</div>
      </div>
      {children}
    </div>
  );

  const SaveBtn = ({label,onClick}:{label:string;onClick:()=>void}) => (
    <button onClick={onClick} className="btn-g" style={{marginTop:20,padding:"11px 28px",fontSize:13,fontWeight:700,borderRadius:11}}>
      {label}
    </button>
  );

  const NotifRow = ({icon,label,sub,on,set}:{icon:string;label:string;sub:string;on:boolean;set:(v:boolean)=>void}) => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:20}}>{icon}</span>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.8)"}}>{label}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:2}}>{sub}</div>
        </div>
      </div>
      <Toggle on={on} set={set}/>
    </div>
  );

  const content: Record<string,React.ReactNode> = {
    profile: (
      <Card title="Profile Settings" icon="👤" color="#818cf8">
        <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>
          <Field label="FULL NAME"><SInp value={pName} onChange={setPName} placeholder="e.g. Juan dela Cruz"/></Field>
          <Field label="EMAIL ADDRESS"><SInp value={pEmail} onChange={setPEmail} placeholder="email@example.com" type="email"/></Field>
          <Field label="CONTACT NUMBER"><SInp value={pPhone} onChange={setPPhone} placeholder="+63 9XX XXX XXXX"/></Field>
          <Field label="PROFILE PICTURE">
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:42,height:42,borderRadius:"50%",background:"rgba(129,140,248,0.12)",border:"1px solid rgba(129,140,248,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                {pPic?<img src={pPic} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} alt="avatar"/>:"👤"}
              </div>
              <label style={{cursor:"pointer"}}>
                <div className="btn" style={{fontSize:12,padding:"7px 14px"}}>Upload Photo</div>
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=()=>setPPic(r.result as string);r.readAsDataURL(f);}}}/>
              </label>
            </div>
          </Field>
        </div>
        <div style={{marginTop:16,padding:"1px",background:"rgba(255,255,255,0.06)",borderRadius:14}}>
          <div style={{background:"#13131f",borderRadius:13,padding:"16px"}}>
            <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",letterSpacing:"0.07em",marginBottom:12}}>CHANGE PASSWORD</div>
            <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:12}}>
              <Field label="NEW PASSWORD"><SInp value={newPw} onChange={setNewPw} type="password" placeholder="Enter new password"/></Field>
              <Field label="CONFIRM PASSWORD"><SInp value={confPw} onChange={setConfPw} type="password" placeholder="Confirm new password"/></Field>
            </div>
          </div>
        </div>
        <SaveBtn label="Save Changes" onClick={()=>{onNameChange(pName);showSaved("Profile updated successfully!");}}/>
      </Card>
    ),

    business: (
      <Card title="Business Information" icon="🏢" color="#34d399">
        <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>
          <Field label="BUSINESS NAME"><SInp value={bName} onChange={setBName} placeholder="Your Store Name"/></Field>
          <Field label="BUSINESS EMAIL"><SInp value={bEmail} onChange={setBEmail} placeholder="info@store.com" type="email"/></Field>
          <Field label="CONTACT NUMBER"><SInp value={bPhone} onChange={setBPhone} placeholder="+63 2 XXXX XXXX"/></Field>
          <Field label="TAX ID NUMBER (TIN)"><SInp value={bTIN} onChange={setBTIN} placeholder="XXX-XXX-XXX-XXX"/></Field>
          <div style={{gridColumn:"1/-1"}}>
            <Field label="STORE ADDRESS"><SInp value={bAddr} onChange={setBAddr} placeholder="Street, City, Province"/></Field>
          </div>
          <div style={{gridColumn:"1/-1"}}>
            <Field label="BUSINESS LOGO">
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:"rgba(255,255,255,0.025)",border:"1.5px dashed rgba(255,255,255,0.1)",borderRadius:12,cursor:"pointer"}}>
                <div style={{width:42,height:42,borderRadius:10,background:"rgba(52,211,153,0.1)",border:"1px solid rgba(52,211,153,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏢</div>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.6)"}}>Click to upload business logo</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:2}}>PNG, JPG up to 2MB · Recommended: 200×200px</div>
                </div>
              </div>
            </Field>
          </div>
        </div>
        <SaveBtn label="Save Business Information" onClick={()=>showSaved("Business info saved!")}/>
      </Card>
    ),

    system: (
      <Card title="System Preferences" icon="⚙️" color="#fbbf24">
        <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:16}}>
          <Field label="CURRENCY FORMAT">
            <SSel value={currency} onChange={setCurrency} options={["PHP ₱ – Philippine Peso","USD $ – US Dollar","EUR € – Euro","JPY ¥ – Japanese Yen"]}/>
          </Field>
          <Field label="DATE FORMAT">
            <SSel value={dateFormat} onChange={setDateFormat} options={["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD","Month DD, YYYY"]}/>
          </Field>
          <Field label="TIME FORMAT">
            <SSel value={timeFormat} onChange={setTimeFormat} options={["12-hour (AM/PM)","24-hour"]}/>
          </Field>
          <Field label="TIMEZONE">
            <SSel value={timezone} onChange={setTimezone} options={["Asia/Manila (UTC+8)","Asia/Singapore (UTC+8)","Asia/Tokyo (UTC+9)","America/New_York (UTC-5)","Europe/London (UTC+0)","UTC"]}/>
          </Field>
        </div>
        <div style={{marginTop:16,padding:"12px 16px",background:"rgba(251,191,36,0.05)",border:"1px solid rgba(251,191,36,0.15)",borderRadius:12,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:16}}>💡</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>Changes to date/time format will affect all reports, invoices, and activity logs system-wide.</span>
        </div>
        <SaveBtn label="Save Preferences" onClick={()=>showSaved("System preferences saved!")}/>
      </Card>
    ),

    notifs: (
      <Card title="Notification Settings" icon="🔔" color="#38bdf8">
        <NotifRow icon="📦" label="Low Stock Alerts" sub="Get notified when items fall below threshold" on={nLowStock} set={setNLowStock}/>
        <NotifRow icon="📅" label="Product Expiration Notifications" sub="Alerts for items nearing or past expiry date" on={nExpiry} set={setNExpiry}/>
        <NotifRow icon="🚚" label="Supplier Delivery Notifications" sub="Notify when a delivery is confirmed or arriving" on={nDelivery} set={setNDelivery}/>
        <NotifRow icon="📈" label="Sales Milestone Alerts" sub="Celebrate and track when sales targets are hit" on={nSales} set={setNSales}/>
        <div style={{marginTop:8,padding:"12px 16px",background:"rgba(56,189,248,0.05)",border:"1px solid rgba(56,189,248,0.15)",borderRadius:12}}>
          <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:4}}>Notification Delivery</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Notifications appear in the bell icon at the top of the dashboard in real time. Email delivery coming in a future update.</div>
        </div>
        <SaveBtn label="Save Notification Settings" onClick={()=>showSaved("Notification settings saved!")}/>
      </Card>
    ),

    security: (
      <Card title="Security Settings" icon="🔐" color="#fb7185">
        {/* Suspicious activity banner */}
        <div style={{padding:"12px 16px",background:"rgba(251,113,133,0.07)",border:"1px solid rgba(251,113,133,0.2)",borderRadius:12,marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:18}}>⚠️</span>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:"#fda4af"}}>Suspicious Activity Detected</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>Liza Pangilinan's account had 4 failed login attempts today. Account has been auto-suspended.</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:16,marginBottom:16}}>
          <Field label="CHANGE PASSWORD">
            <SInp value={newPw} onChange={setNewPw} type="password" placeholder="New password"/>
          </Field>
          <Field label="CONFIRM PASSWORD">
            <SInp value={confPw} onChange={setConfPw} type="password" placeholder="Confirm password"/>
          </Field>
          <Field label="MAX LOGIN ATTEMPTS">
            <SSel value={maxLogin} onChange={setMaxLogin} options={["3","5","10","Unlimited"]}/>
          </Field>
          <Field label="SESSION TIMEOUT">
            <SSel value={sessionTO} onChange={setSessionTO} options={["15 minutes","30 minutes","1 hour","4 hours","Never"]}/>
          </Field>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"rgba(251,113,133,0.05)",border:"1px solid rgba(251,113,133,0.15)",borderRadius:12}}>
          <div>
            <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.8)"}}>Two-Factor Authentication (2FA)</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:2}}>Require a verification code on every login</div>
          </div>
          <Toggle on={twoFA} set={setTwoFA}/>
        </div>
        <SaveBtn label="Update Security Settings" onClick={()=>showSaved("Security settings updated!")}/>
      </Card>
    ),

    backup: (
      <Card title="Backup & Restore" icon="💾" color="#a78bfa">
        <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:12,marginBottom:20}}>
          {[{icon:"📅",label:"Last Backup",value:lastBackup,c:"#818cf8"},{icon:"📦",label:"Backup Size",value:backupSize,c:"#34d399"}].map(s=>(
            <div key={s.label} style={{padding:"16px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span>{s.icon}</span>
                <span style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em"}}>{s.label.toUpperCase()}</span>
              </div>
              <div style={{fontSize:15,fontWeight:700,color:s.c}}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {icon:"💾",label:"Create Manual Backup",sub:"Snapshot current system data",color:"#a78bfa",action:()=>showSaved("Backup created! File ready to download.")},
            {icon:"⬇️",label:"Download Backup File",sub:"Save the latest backup to your device",color:"#38bdf8",action:()=>showSaved("Download started for last backup.")},
            {icon:"🔄",label:"Restore System Data",sub:"Overwrite current data with a backup file",color:"#fb7185",action:()=>showSaved("Restore initiated — system will reload shortly.")},
          ].map(btn=>(
            <button key={btn.label} onClick={btn.action} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:`${btn.color}08`,border:`1px solid ${btn.color}22`,borderRadius:12,cursor:"pointer",fontFamily:"'Inter',sans-serif",transition:"all 0.15s",textAlign:"left"}}
              onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=`${btn.color}15`}
              onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background=`${btn.color}08`}
            >
              <span style={{fontSize:22}}>{btn.icon}</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:btn.color}}>{btn.label}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:2}}>{btn.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    ),

    appearance: (
      <div className="fu1">
        {/* ── Hero banner with animated rays ── */}
        <div style={{
          position:"relative", borderRadius:20, overflow:"hidden",
          marginBottom:20, padding:"36px 32px", minHeight:200,
          background: isDark
            ? "linear-gradient(135deg,#0a0a18 0%,#0d0d20 50%,#0a0a18 100%)"
            : "linear-gradient(135deg,#e8eaf6 0%,#f0f4ff 50%,#edf1fb 100%)",
        }}>
          {/* Animated ray beams */}
          {[
            {deg:"-30deg", c:appColor,    op:0.35, dur:6,  delay:0},
            {deg:"20deg",  c:"#818cf8",   op:0.25, dur:9,  delay:1.5},
            {deg:"60deg",  c:"#38bdf8",   op:0.2,  dur:7,  delay:3},
            {deg:"-60deg", c:"#e879f9",   op:0.18, dur:11, delay:0.8},
            {deg:"45deg",  c:appColor,    op:0.15, dur:8,  delay:4},
            {deg:"-10deg", c:"#fbbf24",   op:0.12, dur:13, delay:2},
          ].map((r,i)=>(
            <div key={i} style={{
              position:"absolute", top:"-50%", left:`${10+i*14}%`,
              width:"2px", height:"200%",
              background:`linear-gradient(180deg, transparent 0%, ${r.c} 40%, ${r.c} 60%, transparent 100%)`,
              opacity:r.op,
              transform:`rotate(${r.deg})`,
              filter:`blur(${i%2===0?3:6}px)`,
              animation:`rayMove${i%3} ${r.dur}s ease-in-out infinite`,
              animationDelay:`${r.delay}s`,
              pointerEvents:"none",
            }}/>
          ))}

          {/* Wide glow orbs behind text */}
          <div style={{position:"absolute",top:"-20%",left:"10%",width:320,height:320,borderRadius:"50%",background:`radial-gradient(circle,${appColor}28 0%,transparent 70%)`,filter:"blur(40px)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:"-30%",right:"5%",width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(129,140,248,0.2) 0%,transparent 70%)",filter:"blur(50px)",pointerEvents:"none"}}/>

          {/* Noise texture overlay */}
          <div style={{position:"absolute",inset:0,opacity:isDark?0.03:0.015,
            backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat:"repeat",backgroundSize:"120px",pointerEvents:"none",
          }}/>

          {/* Content */}
          <div style={{position:"relative",zIndex:2}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
              <div style={{width:40,height:40,borderRadius:12,background:`${appColor}20`,border:`1.5px solid ${appColor}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,backdropFilter:"blur(8px)"}}>🎨</div>
              <div>
                <div style={{fontSize:20,fontWeight:800,color:isDark?"#fff":"#1a1a2e",letterSpacing:"-0.02em"}}>Appearance</div>
                <div style={{fontSize:12,color:isDark?"rgba(255,255,255,0.4)":"rgba(0,0,30,0.45)",marginTop:1}}>Customize how Baryalytics looks and feels</div>
              </div>
            </div>
            {/* Live accent color pill */}
            <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"7px 16px",background:isDark?"rgba(0,0,0,0.3)":"rgba(255,255,255,0.6)",border:`1px solid ${appColor}40`,borderRadius:999,backdropFilter:"blur(10px)",marginTop:8}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:appColor,boxShadow:`0 0 10px ${appColor}`}} className="pulse"/>
              <span style={{fontSize:12,color:isDark?"rgba(255,255,255,0.7)":"rgba(0,0,30,0.7)",fontWeight:600}}>
                {isDark?"Dark Mode":"Light Mode"} · <span style={{color:appColor}}>Live preview active</span>
              </span>
            </div>
          </div>

          {/* Ray keyframes in this component */}
          <style>{`
            @keyframes rayMove0{0%,100%{opacity:0.35;transform:rotate(-30deg) scaleY(1)}50%{opacity:0.5;transform:rotate(-28deg) scaleY(1.08)}}
            @keyframes rayMove1{0%,100%{opacity:0.2;transform:rotate(20deg) scaleY(1)}50%{opacity:0.32;transform:rotate(22deg) scaleY(1.05)}}
            @keyframes rayMove2{0%,100%{opacity:0.15;transform:rotate(60deg) scaleY(1)}50%{opacity:0.28;transform:rotate(58deg) scaleY(1.1)}}
          `}</style>
        </div>

        {/* ── Mode selector ── */}
        <div className="card" style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",marginBottom:16}}>COLOR MODE</div>
          <div style={{display:"grid",gridTemplateColumns:colsW(2),gap:12}}>
            {[
              {id:true,  emoji:"🌙", title:"Dark Mode",  sub:"Easy on the eyes, reduces glare",   accent:"#818cf8"},
              {id:false, emoji:"☀️", title:"Light Mode", sub:"Clean and bright for daytime use",  accent:"#fbbf24"},
            ].map(m=>(
              <button key={String(m.id)} onClick={()=>{setIsDark(m.id);}} style={{
                position:"relative", overflow:"hidden",
                padding:"20px", borderRadius:16, cursor:"pointer",
                border:`2px solid ${isDark===m.id?`${m.accent}50`:"rgba(255,255,255,0.07)"}`,
                background:isDark===m.id
                  ? `linear-gradient(135deg,${m.accent}10,${m.accent}06)`
                  : "rgba(255,255,255,0.03)",
                fontFamily:"'Inter',sans-serif", textAlign:"left", transition:"all 0.25s",
              }}>
                {/* Preview mini-screen */}
                <div style={{
                  width:"100%", height:68, borderRadius:10, marginBottom:14, overflow:"hidden",
                  border:`1px solid ${isDark===m.id?`${m.accent}30`:"rgba(255,255,255,0.08)"}`,
                  background: m.id
                    ? "linear-gradient(135deg,#0a0a18,#13131f)"
                    : "linear-gradient(135deg,#f0f2f8,#ffffff)",
                  position:"relative",
                }}>
                  {/* Mini nav bar */}
                  <div style={{height:14,margin:"6px 6px 0",borderRadius:999,background:m.id?"rgba(255,255,255,0.06)":"rgba(0,0,30,0.06)",display:"flex",alignItems:"center",padding:"0 6px",gap:3}}>
                    {[appColor,"rgba(255,255,255,0.1)","rgba(255,255,255,0.1)","rgba(255,255,255,0.1)"].map((c,i)=>(
                      <div key={i} style={{height:5,width:i===0?22:14,borderRadius:99,background:i===0?appColor:m.id?"rgba(255,255,255,0.12)":"rgba(0,0,30,0.1)"}}/>
                    ))}
                  </div>
                  {/* Mini cards */}
                  <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:4,padding:"5px 6px"}}>
                    {[0,1,2].map(i=>(
                      <div key={i} style={{height:18,borderRadius:4,background:m.id?"rgba(255,255,255,0.04)":"rgba(0,0,30,0.05)",border:`1px solid ${m.id?"rgba(255,255,255,0.06)":"rgba(0,0,30,0.07)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <div style={{height:3,width:16,borderRadius:99,background:i===0?appColor:m.id?"rgba(255,255,255,0.15)":"rgba(0,0,30,0.12)"}}/>
                      </div>
                    ))}
                  </div>
                  {/* Glow in preview */}
                  {isDark===m.id&&<div style={{position:"absolute",top:0,right:0,width:40,height:40,background:`radial-gradient(circle,${m.accent}30,transparent 70%)`,pointerEvents:"none"}}/>}
                </div>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                      <span style={{fontSize:16}}>{m.emoji}</span>
                      <span style={{fontSize:13,fontWeight:700,color:isDark===m.id?m.accent:"rgba(255,255,255,0.7)"}}>{m.title}</span>
                    </div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{m.sub}</div>
                  </div>
                  {/* Selection ring */}
                  <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${isDark===m.id?m.accent:"rgba(255,255,255,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}>
                    {isDark===m.id&&<div style={{width:10,height:10,borderRadius:"50%",background:m.accent,boxShadow:`0 0 8px ${m.accent}`}}/>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Color palette ── */}
        <div className="card" style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",marginBottom:16}}>ACCENT COLOR</div>

          {/* Color swatches with glow and label */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:10,marginBottom:16}}>
            {[
              {c:"#34d399",name:"Emerald"},
              {c:"#38bdf8",name:"Sky"},
              {c:"#818cf8",name:"Indigo"},
              {c:"#a78bfa",name:"Violet"},
              {c:"#fb7185",name:"Rose"},
              {c:"#fbbf24",name:"Amber"},
              {c:"#f97316",name:"Orange"},
              {c:"#e879f9",name:"Fuchsia"},
            ].map(({c,name})=>{
              const sel = appColor===c;
              return (
                <button key={c} onClick={()=>{setAppColor(c);}} title={name} style={{
                  display:"flex",flexDirection:"column",alignItems:"center",gap:6,
                  background:"none",border:"none",cursor:"pointer",padding:"4px 0",
                }}>
                  <div style={{
                    width:"100%",aspectRatio:"1",borderRadius:14,background:c,
                    border:`3px solid ${sel?"rgba(255,255,255,0.8)":"transparent"}`,
                    boxShadow:sel?`0 0 0 1px ${c}, 0 4px 20px ${c}70`:`0 2px 8px ${c}40`,
                    transition:"all 0.2s",
                    transform:sel?"scale(1.12)":"scale(1)",
                    position:"relative",overflow:"hidden",
                  }}>
                    {/* Gloss shine */}
                    <div style={{position:"absolute",top:0,left:0,right:0,height:"50%",background:"rgba(255,255,255,0.2)",borderRadius:"12px 12px 60% 60%"}}/>
                    {sel&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"rgba(0,0,0,0.6)",fontWeight:900}}>✓</div>}
                  </div>
                  <span style={{fontSize:9,fontWeight:sel?700:500,color:sel?c:"rgba(255,255,255,0.3)",letterSpacing:"0.02em"}}>{name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom hex input */}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:isDark?"rgba(255,255,255,0.025)":"rgba(0,0,30,0.03)",border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,30,0.07)"}`,borderRadius:12}}>
            <div style={{width:32,height:32,borderRadius:9,background:appColor,flexShrink:0,boxShadow:`0 0 12px ${appColor}60`,border:"2px solid rgba(255,255,255,0.2)"}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em",marginBottom:4}}>CUSTOM HEX</div>
              <input
                value={appColor}
                onChange={e=>{const v=e.target.value;if(/^#[0-9a-fA-F]{0,6}$/.test(v))setAppColor(v);}}
                className="inp"
                style={{padding:"6px 10px",fontSize:13,fontFamily:"monospace",letterSpacing:"0.06em",width:"100%",maxWidth:120,borderRadius:8}}
                placeholder="#34d399"
              />
            </div>
            {/* Gradient preview strip */}
            <div style={{flex:1,height:28,borderRadius:8,background:`linear-gradient(90deg,${appColor}20,${appColor},${appColor}20)`,border:`1px solid ${appColor}40`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.15) 50%,transparent 100%)",animation:"shimmerGold 2s linear infinite"}}/>
            </div>
          </div>

          {/* Live accent preview swatches */}
          <div style={{marginTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
            {[
              {label:"Button",   bg:`${appColor}18`, border:`${appColor}40`, text:appColor},
              {label:"Badge",    bg:`${appColor}15`, border:`${appColor}30`, text:appColor},
              {label:"Active pill",bg:appColor,     border:appColor,         text:isDark?"#000":"#fff"},
              {label:"Chip",     bg:`${appColor}12`, border:`${appColor}25`, text:appColor},
            ].map(p=>(
              <div key={p.label} style={{padding:"5px 14px",background:p.bg,border:`1px solid ${p.border}`,borderRadius:999,fontSize:11,fontWeight:700,color:p.text}}>
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Layout style ── */}
        <div className="card" style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",letterSpacing:"0.07em",marginBottom:14}}>DASHBOARD LAYOUT</div>
          <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:10}}>
            {["Default","Compact","Expanded"].map(l=>(
              <button key={l} onClick={()=>setLayout(l)} style={{
                padding:"14px 12px",borderRadius:12,cursor:"pointer",
                background:layout===l?`${appColor}10`:"rgba(255,255,255,0.02)",
                border:`1.5px solid ${layout===l?`${appColor}40`:"rgba(255,255,255,0.07)"}`,
                fontFamily:"'Inter',sans-serif",transition:"all 0.2s",
              }}>
                <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:8}}>
                  {l==="Compact"
                    ? [8,8,8].map((_,i)=><div key={i} style={{height:4,borderRadius:2,background:layout===l?`${appColor}50`:"rgba(255,255,255,0.1)"}}/>)
                    : l==="Expanded"
                    ? [14].map((_,i)=><div key={i} style={{height:14,borderRadius:4,background:layout===l?`${appColor}40`:"rgba(255,255,255,0.08)"}}/>)
                    : [8,6].map((_,i)=><div key={i} style={{height:i===0?8:5,borderRadius:2,background:layout===l?`${appColor}50`:"rgba(255,255,255,0.1)"}}/>) 
                  }
                </div>
                <div style={{fontSize:12,fontWeight:700,color:layout===l?appColor:"rgba(255,255,255,0.5)"}}>{l}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={()=>{showSaved("Appearance saved and applied!");}} className="btn-g" style={{padding:"12px 32px",fontSize:13,fontWeight:700,borderRadius:12,marginTop:4}}>
          ✓ Apply Appearance
        </button>
      </div>
    ),

    defaults: (
      <Card title="Default System Values" icon="📋" color="#fbbf24">
        <div style={{marginBottom:10,padding:"12px 16px",background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.18)",borderRadius:12,fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.6}}>
          These values are automatically applied when recording sales, managing inventory, or generating financial reports. Changing them will affect all future calculations.
        </div>
        <div style={{display:"grid",gridTemplateColumns:colsW(3),gap:16,marginTop:16}}>
          <Field label="DEFAULT TAX RATE (%)">
            <div style={{position:"relative"}}>
              <SInp value={taxRate} onChange={setTaxRate} placeholder="12"/>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"rgba(255,255,255,0.3)",fontWeight:700}}>%</span>
            </div>
          </Field>
          <Field label="DEFAULT PROFIT MARGIN (%)">
            <div style={{position:"relative"}}>
              <SInp value={margin} onChange={setMargin} placeholder="30"/>
              <span style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"rgba(255,255,255,0.3)",fontWeight:700}}>%</span>
            </div>
          </Field>
          <Field label="LOW STOCK THRESHOLD (units)">
            <SInp value={lowStockTh} onChange={setLowStockTh} placeholder="20"/>
          </Field>
        </div>
        <div style={{marginTop:16,display:"grid",gridTemplateColumns:colsW(3),gap:10}}>
          {[{label:"Tax Rate",value:`${taxRate}%`,c:"#34d399"},{label:"Profit Margin",value:`${margin}%`,c:"#38bdf8"},{label:"Low Stock at",value:`${lowStockTh} units`,c:"#fbbf24"}].map(s=>(
            <div key={s.label} style={{padding:"12px 14px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,textAlign:"center"}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:4}}>{s.label}</div>
              <div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.value}</div>
            </div>
          ))}
        </div>
        <SaveBtn label="Save Default Values" onClick={()=>showSaved("Default values saved!")}/>
      </Card>
    ),
  };

  return (
    <div className="fu1">
      {/* Page header */}
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:800,color:"#fff",marginBottom:4}}>Settings</h1>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.3)"}}>Manage your profile, system preferences, and business configuration.</p>
      </div>

      {/* Toast */}
      {saved&&ReactDOM.createPortal(
        <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"rgba(52,211,153,0.15)",border:"1px solid rgba(52,211,153,0.35)",borderRadius:999,padding:"11px 24px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",animation:"fadeUp 0.2s ease both",backdropFilter:"blur(12px)"}}>
          <span style={{fontSize:15}}>✅</span>
          <span style={{fontSize:13,fontWeight:600,color:"#6ee7b7"}}>{saved}</span>
        </div>,
        document.body
      )}

      <div style={{display:"flex",gap:20,alignItems:"flex-start",flexDirection:window.innerWidth<=900?"column":"row"}}>
        {/* Sidebar */}
        <div style={{width:window.innerWidth<=900?"100%":"220px",flexShrink:0}}>
          <div style={{background:"#13131f",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,overflow:"hidden",position:"sticky",top:88}}>
            {sections.map((s,i)=>(
              <button key={s.id} onClick={()=>setActiveSection(s.id)} style={{
                width:"100%",display:"flex",alignItems:"center",gap:11,
                padding:"12px 16px",background:activeSection===s.id?"rgba(129,140,248,0.1)":"none",
                border:"none",borderLeft:`3px solid ${activeSection===s.id?"#818cf8":"transparent"}`,
                cursor:"pointer",fontFamily:"'Inter',sans-serif",textAlign:"left",
                borderBottom:i<sections.length-1?"1px solid rgba(255,255,255,0.04)":"none",
                transition:"all 0.15s",
              }}>
                <span style={{fontSize:17}}>{s.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:activeSection===s.id?"#c7d2fe":"rgba(255,255,255,0.6)"}}>{s.label}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.25)",marginTop:1}}>{s.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div style={{flex:1,minWidth:0}}>
          {content[activeSection]}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [authed, setAuthed]          = useState(false);
  const [authName, setAuthName]      = useState("Juan dela Cruz");
  const [page, setPage]              = useState("Dashboard");
  const [ctab, setCtab]              = useState("DAILY");
  const [aiPage, setAiPage]          = useState<string|null>(null);
  const [showNotif, setShowNotif]    = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen]  = useState(false);
  const [isDark, setIsDark]          = useState(true);

  // Responsive breakpoints
  const W = useW();
  const isMob  = W <= 900;
  const isSm   = W <= 600;
  // Responsive grid helper
  const cols = (desktop:number): string => {
    if(isSm)  return desktop >= 3 ? "1fr 1fr" : "1fr";
    if(isMob) return desktop >= 4 ? "1fr 1fr" : desktop === 3 ? "1fr 1fr" : "1fr";
    return `repeat(${desktop},1fr)`;
  };
  const colsSplit = (a:string,b:string): string => isMob ? "1fr" : `${a} ${b}`;
  const [appColor, setAppColor]      = useState("#34d399");

  // Dynamic theme CSS injected globally
  const acR = parseInt(appColor.slice(1,3),16);
  const acG = parseInt(appColor.slice(3,5),16);
  const acB = parseInt(appColor.slice(5,7),16);
  const lm = !isDark; // light mode shorthand
  const dynamicCSS = `
    :root {
      --accent:     ${appColor};
      --accent-rgb: ${acR},${acG},${acB};
      --bg-main:    ${lm ? "#eef0f7" : "#0d0d14"};
      --bg-card:    ${lm ? "#ffffff" : "#13131f"};
      --bg-card2:   ${lm ? "#f4f6fc" : "#161622"};
      --bg-card3:   ${lm ? "#f9fafd" : "#0f0f1e"};
      --border:     ${lm ? "rgba(0,0,40,0.1)"  : "rgba(255,255,255,0.07)"};
      --border2:    ${lm ? "rgba(0,0,40,0.06)" : "rgba(255,255,255,0.04)"};
      --text:       ${lm ? "#1a1a2e"            : "#e2e8f0"};
      --text2:      ${lm ? "#3a3a5c"            : "#94a3b8"};
      --text3:      ${lm ? "rgba(0,0,40,0.5)"  : "rgba(255,255,255,0.45)"};
      --text4:      ${lm ? "rgba(0,0,40,0.35)" : "rgba(255,255,255,0.3)"};
      --text5:      ${lm ? "rgba(0,0,40,0.22)" : "rgba(255,255,255,0.18)"};
      --hover-row:  ${lm ? "rgba(0,0,40,0.025)": "rgba(255,255,255,0.015)"};
      --inp-bg:     ${lm ? "rgba(0,0,40,0.04)" : "rgba(255,255,255,0.05)"};
      --inp-border: ${lm ? "rgba(0,0,40,0.12)" : "rgba(255,255,255,0.08)"};
    }

    /* ── Base ── */
    body { background: var(--bg-main) !important; color: var(--text) !important; transition: background 0.35s, color 0.35s; }
    * { transition: background-color 0.35s, border-color 0.35s, color 0.35s; }

    /* ── Page wrapper ── */
    #root > * > div[style*="min-height"] { background: var(--bg-main) !important; }

    /* ── Cards ── */
    .card { background: var(--bg-card) !important; border-color: var(--border) !important;
      ${lm ? "box-shadow: 0 2px 12px rgba(0,0,40,0.07);" : ""} }
    .card-title { color: var(--text3) !important; }
    .card-x { color: var(--text5) !important; }
    .ai-card { background: var(--bg-card2) !important; border-color: var(--border) !important; }
    .ai-card:hover { background: ${lm?"#edf0fa":"#1a1a2e"} !important; }
    .insight-card { background: ${lm?"rgba(129,140,248,0.06)":"linear-gradient(135deg,rgba(129,140,248,0.1),rgba(167,139,250,0.06))"} !important; }
    .stat-forecast { border-color: rgba(${acR},${acG},${acB},0.2) !important;
      background: ${lm?"rgba(255,255,255,0.9)":"rgba(129,140,248,0.04)"} !important; }

    /* ── Nav bar ── */
    .nav-bar {
      background: ${lm?"rgba(238,240,247,0.92)":"rgba(13,13,22,0.82)"} !important;
      border-color: ${lm?"rgba(0,0,40,0.1)":"rgba(255,255,255,0.09)"} !important;
    }
    .nav-pill { color: ${lm?"rgba(0,0,40,0.5)":"rgba(255,255,255,0.45)"} !important; }
    .nav-pill:hover { color: ${appColor} !important; background: rgba(${acR},${acG},${acB},0.1) !important; }
    .nav-pill-active { background: ${appColor} !important; color: ${lm?"#fff":"#000"} !important;
      box-shadow: 0 0 16px rgba(${acR},${acG},${acB},0.35) !important; }

    /* ── Inputs ── */
    .inp { background: var(--inp-bg) !important; border-color: var(--inp-border) !important; color: var(--text) !important; }
    .inp:focus { border-color: ${appColor}80 !important; box-shadow: 0 0 0 3px rgba(${acR},${acG},${acB},0.1) !important; }
    .inp::placeholder { color: var(--text4) !important; }
    select.inp option { background: var(--bg-card) !important; color: var(--text) !important; }

    /* ── Buttons ── */
    .btn { background: ${lm?"rgba(0,0,40,0.06)":"rgba(255,255,255,0.06)"} !important;
      border-color: ${lm?"rgba(0,0,40,0.12)":"rgba(255,255,255,0.1)"} !important;
      color: ${lm?"rgba(0,0,40,0.65)":"rgba(255,255,255,0.65)"} !important; }
    .btn:hover { background: ${lm?"rgba(0,0,40,0.1)":"rgba(255,255,255,0.1)"} !important; color: var(--text) !important; }
    .btn-g { background: rgba(${acR},${acG},${acB},0.15) !important; border-color: rgba(${acR},${acG},${acB},0.3) !important; color: ${appColor} !important; }
    .btn-g:hover { background: rgba(${acR},${acG},${acB},0.25) !important; }
    .btn-r { ${lm?"background:rgba(251,113,133,0.12)!important;border-color:rgba(251,113,133,0.25)!important;color:#e11d48!important;":""} }

    /* ── Tabs ── */
    .tab-wrap { background: ${lm?"rgba(0,0,40,0.06)":"rgba(255,255,255,0.05)"} !important;
      border-color: ${lm?"rgba(0,0,40,0.1)":"rgba(255,255,255,0.08)"} !important; }
    .tab-on { background: ${appColor} !important; color: ${lm?"#fff":"#000"} !important; }
    .tab-off { color: var(--text3) !important; }
    .tab-off:hover { color: var(--text) !important; }

    /* ── Tables ── */
    .th { color: var(--text3) !important; border-color: var(--border) !important;
      background: ${lm?"rgba(0,0,40,0.025)":"transparent"} !important; }
    .td { border-color: var(--border2) !important; color: var(--text) !important; }
    .tr:hover td { background: var(--hover-row) !important; }

    /* ── Badges & chips ── */
    .badge-g { color: ${appColor} !important; background: rgba(${acR},${acG},${acB},0.12) !important; border-color: rgba(${acR},${acG},${acB},0.25) !important; }
    .badge-r { ${lm?"color:#be123c!important;background:rgba(251,113,133,0.1)!important;border-color:rgba(251,113,133,0.22)!important;":""} }
    .badge-a { ${lm?"color:#b45309!important;background:rgba(251,191,36,0.1)!important;border-color:rgba(251,191,36,0.22)!important;":""} }
    .badge-v { ${lm?"color:#6d28d9!important;background:rgba(129,140,248,0.1)!important;border-color:rgba(129,140,248,0.22)!important;":""} }
    .chip-up { background: rgba(${acR},${acG},${acB},0.15) !important; color: ${appColor} !important; }
    .chip-down { ${lm?"color:#be123c!important;background:rgba(251,113,133,0.12)!important;":""} }

    /* ── Alert rows ── */
    .alert-row { ${lm?"background:rgba(251,113,133,0.06)!important;border-color:rgba(251,113,133,0.18)!important;color:#3a3a5c!important;":""} }

    /* ── Background glows ── */
    .bg-tl { background: radial-gradient(ellipse at 0% 0%, rgba(${acR},${acG},${acB},${lm?0.08:0.13}) 0%, transparent 70%) !important; }
    .bg-br { background: radial-gradient(ellipse at 100% 100%, rgba(${acR},${acG},${acB},${lm?0.05:0.09}) 0%, transparent 70%) !important; }

    /* ── Export button ── */
    .export-btn { ${lm?"background:rgba(129,140,248,0.1)!important;color:#4f46e5!important;border-color:rgba(129,140,248,0.3)!important;":""} }

    /* ── Shimmer ── */
    .shimmer-bar { background: linear-gradient(90deg, transparent 0%, ${lm?"rgba(0,0,40,0.04)":"rgba(255,255,255,0.06)"} 50%, transparent 100%) !important; }

    ${lm ? `
    /* ── Light mode: base wrapper ── */
    [data-lm="1"] { background: #eef0f7 !important; color: #1a1a2e !important; }

    /* ── Fix ALL inline dark backgrounds ── */
    [data-lm="1"] [style*="background: #0d0d14"],
    [data-lm="1"] [style*="background:#0d0d14"]   { background: #eef0f7 !important; }
    [data-lm="1"] [style*="background: #13131f"],
    [data-lm="1"] [style*="background:#13131f"]   { background: #ffffff !important; }
    [data-lm="1"] [style*="background: #161622"],
    [data-lm="1"] [style*="background:#161622"]   { background: #f4f6fc !important; }
    [data-lm="1"] [style*="background: #0f0f1e"],
    [data-lm="1"] [style*="background:#0f0f1e"]   { background: #f9fafd !important; }
    [data-lm="1"] [style*="background: #14142a"],
    [data-lm="1"] [style*="background:#14142a"]   { background: #f0f2fc !important; }
    [data-lm="1"] [style*="background: #1a1a2e"],
    [data-lm="1"] [style*="background:#1a1a2e"]   { background: #edf0fa !important; }
    [data-lm="1"] [style*="background: rgb(13, 13, 20)"]  { background: #eef0f7 !important; }
    [data-lm="1"] [style*="background: rgb(19, 19, 31)"]  { background: #ffffff !important; }

    /* ── Fix inline white/light text → dark text ── */
    [data-lm="1"] [style*="color: #fff"]          { color: #1a1a2e !important; }
    [data-lm="1"] [style*="color: #e2e8f0"]       { color: #1a1a2e !important; }
    [data-lm="1"] [style*="color: #fff;"]         { color: #1a1a2e !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 1)"]   { color: #1a1a2e !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.9)"] { color: rgba(0,0,40,0.85) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.8)"] { color: rgba(0,0,40,0.75) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.7)"] { color: rgba(0,0,40,0.65) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.6)"] { color: rgba(0,0,40,0.55) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.5)"] { color: rgba(0,0,40,0.5) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.4)"] { color: rgba(0,0,40,0.45) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.3)"] { color: rgba(0,0,40,0.38) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.2)"] { color: rgba(0,0,40,0.3) !important; }
    [data-lm="1"] [style*="color: rgba(255, 255, 255, 0.1)"] { color: rgba(0,0,40,0.22) !important; }

    /* ── Fix inline dark borders → light borders ── */
    [data-lm="1"] [style*="border: 1px solid rgba(255, 255, 255"]   { border-color: rgba(0,0,40,0.1) !important; }
    [data-lm="1"] [style*="borderBottom: 1px solid rgba(255, 255, 255"] { border-color: rgba(0,0,40,0.07) !important; }
    [data-lm="1"] [style*="borderTop: 1px solid rgba(255, 255, 255"]    { border-color: rgba(0,0,40,0.07) !important; }
    [data-lm="1"] [style*="border-bottom: 1px solid rgba(255, 255, 255"] { border-color: rgba(0,0,40,0.07) !important; }

    /* ── Fix semi-transparent white backgrounds ── */
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.03)"] { background: rgba(0,0,40,0.025) !important; }
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.04)"] { background: rgba(0,0,40,0.03) !important; }
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.05)"] { background: rgba(0,0,40,0.04) !important; }
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.06)"] { background: rgba(0,0,40,0.05) !important; }
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.07)"] { background: rgba(0,0,40,0.055) !important; }
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.08)"] { background: rgba(0,0,40,0.06) !important; }
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.1)"]  { background: rgba(0,0,40,0.07) !important; }

    /* ── Nav, notifications, modals ── */
    [data-lm="1"] .notif-panel-inner  { background: #f4f6fc !important; }
    [data-lm="1"] [style*="background: #080812"] { background: #eef0f7 !important; }
    [data-lm="1"] [style*="background: rgba(13, 13, 22"]  { background: rgba(238,240,247,0.95) !important; }
    [data-lm="1"] [style*="background: rgba(12, 12, 24"]  { background: rgba(240,242,248,0.98) !important; }
    [data-lm="1"] [style*="background: rgba(15, 15, 28"]  { background: rgba(240,242,250,0.98) !important; }
    [data-lm="1"] [style*="background: rgba(20, 20, 42"]  { background: rgba(244,246,252,0.98) !important; }
    [data-lm="1"] [style*="background: rgba(0, 0, 0"]     { background: rgba(0,0,40,0.04) !important; }

    /* ── Scrollbar ── */
    [data-lm="1"] ::-webkit-scrollbar-thumb { background: rgba(0,0,40,0.15) !important; }

    /* ── Specific section dividers ── */
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.14)"],
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.12)"],
    [data-lm="1"] [style*="background: rgba(255, 255, 255, 0.09)"] { background: rgba(0,0,40,0.09) !important; }
    ` : ""}
  `;

  if(!authed) return <AuthPage onAuth={(n)=>{setAuthName(n);setAuthed(true);}}/>;

  const nav = ["Dashboard","Inventory","Sales","Supplier","Finance","User"];
  const icons: Record<string,any> = {
    Dashboard:LayoutGrid, Inventory:ClipboardList, Sales:CircleDollarSign,
    Supplier:Briefcase, Finance:Mail, User:User, Settings:Sparkles,
  };

  return (
    <ToastProvider>
    <>
      <style>{G}</style>
      <style>{dynamicCSS}</style>
      <div data-lm={lm?"1":undefined} style={{minHeight:"100vh",background:lm?"#eef0f7":"#0d0d14",transition:"background 0.35s"}}>
        <div className="bg-tl"/><div className="bg-br"/>

        {/* NAV — floating pill wrapper */}
        {/* Mobile drawer overlay */}
        <div className={`mob-drawer-overlay${mobileOpen?" open":""}`} onClick={()=>setMobileOpen(false)}/>
        {/* Mobile slide-in drawer */}
        <div className={`mob-drawer${mobileOpen?" open":""}`}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,borderRadius:"50%",overflow:"hidden",flexShrink:0}}>
                <BaryalyticsLogo size={32}/>
              </div>
              <span style={{fontSize:14,fontWeight:800,color:"#fff",letterSpacing:"0.04em"}}>BARYALYTICS</span>
            </div>
            <button onClick={()=>setMobileOpen(false)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,0.5)"}}>✕</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4,flex:1}}>
            {nav.map(item=>{
              const I=icons[item];
              return (
                <button key={item} onClick={()=>{setPage(item);setAiPage(null);setMobileOpen(false);}} style={{
                  display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,
                  background:page===item?`rgba(${acR},${acG},${acB},0.12)`:"none",
                  border:`1px solid ${page===item?`rgba(${acR},${acG},${acB},0.25)`:"transparent"}`,
                  cursor:"pointer",fontFamily:"'Inter',sans-serif",textAlign:"left",transition:"all 0.15s",
                }}>
                  <I size={16} color={page===item?appColor:"rgba(255,255,255,0.45)"}/>
                  <span style={{fontSize:13,fontWeight:page===item?700:500,color:page===item?appColor:"rgba(255,255,255,0.55)"}}>{item}</span>
                </button>
              );
            })}
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:16,display:"flex",flexDirection:"column",gap:8}}>
            <button onClick={()=>{setPage("Settings");setMobileOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:"rgba(129,140,248,0.08)",border:"1px solid rgba(129,140,248,0.15)",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span style={{fontSize:13,fontWeight:600,color:"#818cf8"}}>Settings</span>
            </button>
            <button onClick={()=>setAuthed(false)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,background:"rgba(251,113,133,0.08)",border:"1px solid rgba(251,113,133,0.15)",cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span style={{fontSize:13,fontWeight:600,color:"#fb7185"}}>Logout</span>
            </button>
          </div>
        </div>

        <div className="nav-float-wrap" style={{position:"fixed",top:16,left:0,right:0,zIndex:50,display:"flex",justifyContent:"center",padding:"0 24px",pointerEvents:"none"}}>
          <nav className="nav-bar" style={{
            display:"flex",alignItems:"center",justifyContent:"space-between",
            padding:"0 8px 0 12px",height:52,width:"100%",maxWidth:1180,
            pointerEvents:"all",
          }}>
            {/* Hamburger — mobile only, JS-controlled */}
            {isMob&&(
              <button onClick={()=>setMobileOpen(true)} style={{width:34,height:34,borderRadius:10,background:lm?"rgba(0,0,40,0.06)":"rgba(255,255,255,0.06)",border:`1px solid ${lm?"rgba(0,0,40,0.1)":"rgba(255,255,255,0.1)"}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:lm?"rgba(0,0,40,0.6)":"rgba(255,255,255,0.7)",flexShrink:0}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            )}

            {/* Left — brand + welcome — desktop only */}
            {!isMob&&(
              <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  {(()=>{const I=icons[page];return <I size={16} color={lm?"rgba(0,0,40,0.55)":"rgba(255,255,255,0.7)"}/>;})()}
                  <span style={{fontSize:12,fontWeight:700,color:lm?"rgba(0,0,40,0.55)":"rgba(255,255,255,0.55)",letterSpacing:"0.08em"}}>{page.toUpperCase()}</span>
                </div>
                <div style={{width:1,height:14,background:lm?"rgba(0,0,40,0.12)":"rgba(255,255,255,0.1)",margin:"0 4px"}}/>
                <span style={{fontSize:12,color:lm?"rgba(0,0,40,0.4)":"rgba(255,255,255,0.3)"}}>Hi, <span style={{color:lm?"rgba(0,0,40,0.65)":"rgba(255,255,255,0.55)",fontWeight:600}}>{authName.split(" ")[0]}</span></span>
              </div>
            )}

            {/* Mobile center: current page label */}
            {isMob&&(
              <div style={{display:"flex",alignItems:"center",gap:7,position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
                {(()=>{const I=icons[page];return <I size={14} color={appColor}/>;})()}
                <span style={{fontSize:13,fontWeight:700,color:lm?"#1a1a2e":"#fff",letterSpacing:"0.05em"}}>{page.toUpperCase()}</span>
              </div>
            )}

            {/* Center — nav pills — desktop only */}
            {!isMob&&(
              <div style={{display:"flex",alignItems:"center",gap:2,position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
                {nav.map(item=>(
                  <button key={item} onClick={()=>{setPage(item);setAiPage(null);}} className={page===item?"nav-pill-active":"nav-pill"}>{item}</button>
                ))}
              </div>
            )}

            {/* Right — actions */}
            <div style={{display:"flex",alignItems:"center",gap:isMob?6:8,flexShrink:0}}>
              {/* Bell */}
              <button onClick={()=>setShowNotif(v=>!v)} style={{position:"relative",background:showNotif?"rgba(129,140,248,0.15)":lm?"rgba(0,0,40,0.06)":"rgba(255,255,255,0.05)",border:`1px solid ${showNotif?"rgba(129,140,248,0.3)":lm?"rgba(0,0,40,0.1)":"rgba(255,255,255,0.08)"}`,borderRadius:999,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:showNotif?"#818cf8":lm?"rgba(0,0,40,0.5)":"rgba(255,255,255,0.5)",transition:"all 0.18s"}}>
                <Bell size={15} className={showNotif?"":"bell-new"}/>
                <span style={{position:"absolute",top:-3,right:-3,background:"#ef4444",color:"#fff",fontSize:8,fontWeight:700,minWidth:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:99,border:`2px solid ${lm?"#eef0f7":"#0d0d14"}`,padding:"0 2px",animation:"urgentPulse 2s ease infinite"}}>
                  {INIT_NOTIFS.filter(n=>!n.read).length}
                </span>
              </button>
              {showNotif&&<NotifPanel onClose={()=>setShowNotif(false)}/>}

              {/* User dropdown */}
              <div style={{position:"relative"}}>
                <button
                  onClick={()=>setShowUserMenu(v=>!v)}
                  style={{display:"flex",alignItems:"center",gap:7,background:showUserMenu?"rgba(212,175,55,0.14)":"rgba(212,175,55,0.07)",border:`1px solid ${showUserMenu?"rgba(212,175,55,0.35)":"rgba(212,175,55,0.18)"}`,borderRadius:999,padding:"4px 10px 4px 5px",cursor:"pointer",transition:"all 0.18s"}}
                >
                  <div style={{width:24,height:24,borderRadius:"50%",background:"linear-gradient(135deg,rgba(184,134,11,0.6),rgba(212,175,55,0.35))",border:"1px solid rgba(212,175,55,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <User size={12} color="#d4af37"/>
                  </div>
                  <span style={{fontSize:12,fontWeight:700,color:lm?"rgba(0,0,40,0.7)":"rgba(255,255,255,0.7)",letterSpacing:"0.04em"}}>{authName.split(" ")[0].toUpperCase()}</span>
                  <ChevronDown size={11} color={lm?"rgba(0,0,40,0.3)":"rgba(255,255,255,0.3)"} style={{transform:showUserMenu?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.18s"}}/>
                </button>

                {showUserMenu&&ReactDOM.createPortal(
                  <div style={{position:"fixed",inset:0,zIndex:9980}} onMouseDown={()=>setShowUserMenu(false)}>
                    <div
                      onMouseDown={e=>e.stopPropagation()}
                      style={{
                        position:"absolute",top:72,right:24,width:200,
                        background:lm?"rgba(240,242,248,0.98)":"rgba(15,15,28,0.97)",
                        border:`1px solid ${lm?"rgba(0,0,40,0.1)":"rgba(212,175,55,0.18)"}`,
                        borderRadius:16,overflow:"hidden",
                        boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
                        animation:"fadeUp 0.18s ease both",
                      }}
                    >
                      <div style={{padding:"14px 16px 12px",borderBottom:`1px solid ${lm?"rgba(0,0,40,0.07)":"rgba(255,255,255,0.06)"}`}}>
                        <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,rgba(184,134,11,0.5),rgba(212,175,55,0.3))",border:"1px solid rgba(212,175,55,0.3)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:8}}>
                          <User size={16} color="#d4af37"/>
                        </div>
                        <div style={{fontSize:13,fontWeight:700,color:lm?"#1a1a2e":"#fff"}}>{authName}</div>
                        <div style={{fontSize:11,color:lm?"rgba(0,0,40,0.4)":"rgba(255,255,255,0.3)",marginTop:2}}>Administrator</div>
                      </div>
                      <button
                        onMouseDown={e=>{e.stopPropagation();setPage("Settings");setShowUserMenu(false);}}
                        style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif",transition:"background 0.12s"}}
                        onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background="rgba(129,140,248,0.08)"}
                        onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background="none"}
                      >
                        <div style={{width:28,height:28,borderRadius:8,background:"rgba(129,140,248,0.1)",border:"1px solid rgba(129,140,248,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                        </div>
                        <span style={{fontSize:13,fontWeight:600,color:lm?"rgba(0,0,40,0.7)":"rgba(255,255,255,0.7)"}}>Settings</span>
                      </button>
                      <div style={{height:1,background:lm?"rgba(0,0,40,0.06)":"rgba(255,255,255,0.05)",margin:"0 12px"}}/>
                      <button
                        onMouseDown={e=>{e.stopPropagation();setAuthed(false);setShowUserMenu(false);}}
                        style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 16px 14px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif",transition:"background 0.12s"}}
                        onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background="rgba(251,113,133,0.08)"}
                        onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background="none"}
                      >
                        <div style={{width:28,height:28,borderRadius:8,background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        </div>
                        <span style={{fontSize:13,fontWeight:600,color:"rgba(251,113,133,0.9)"}}>Logout</span>
                      </button>
                    </div>
                  </div>,
                  document.body
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Extra top spacer so content never slides under the floating bar */}
        <div style={{height:88}}/>

        <main style={{position:"relative",zIndex:10,maxWidth:1440,margin:"0 auto",padding:`0 ${isMob?"16px":"24px"} 48px`}}>

          {/* ── DASHBOARD ── */}
          {page==="Dashboard"&&(
            <>
              {/* STAT CARDS */}
              <div className="grid-5col" style={{display:"grid",gridTemplateColumns:cols(5),gap:16,marginBottom:20}}>
                <div className="card">
                  <div className="card-title">Daily Sales <button className="card-x"><X size={13}/></button></div>
                  <div className="stat-num" style={{fontSize:26,fontWeight:700,color:"#fff",marginTop:2}}>₱167,001</div>
                  <div style={{marginTop:8}}><span className="chip-up"><TrendingUp size={10}/> 15%</span></div>
                </div>
                <div className="card">
                  <div className="card-title">Monthly Sales <button className="card-x"><X size={13}/></button></div>
                  <div className="stat-num" style={{fontSize:26,fontWeight:700,color:"#fff",marginTop:2}}>₱12.5 M</div>
                  <div style={{marginTop:8}}><span className="chip-up"><TrendingUp size={10}/> 10%</span></div>
                </div>
                <div className="card">
                  <div className="card-title">Sales Target <button className="card-x"><X size={13}/></button></div>
                  <div style={{display:"flex",alignItems:"baseline",gap:8,marginTop:2}}>
                    <span style={{fontSize:30,fontWeight:700,color:"#fff"}}>5,000</span>
                    <span style={{fontSize:15,color:"rgba(255,255,255,0.35)"}}>/ 25,000</span>
                  </div>
                  <div style={{marginTop:10,height:4,background:"rgba(255,255,255,0.07)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:"20%",background:"linear-gradient(90deg,#34d399,#10b981)",borderRadius:99}}/>
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Available Stock <button className="card-x"><X size={13}/></button></div>
                  <div style={{display:"flex",alignItems:"baseline",gap:6,marginTop:2}}>
                    <span style={{fontSize:28,fontWeight:700,color:"#34d399"}}>32,091</span>
                    <span style={{fontSize:15,color:"rgba(52,211,153,0.6)"}}>Items</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Low Stock Alerts <button className="card-x"><X size={13}/></button></div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:2}}>
                    <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                      <span style={{fontSize:28,fontWeight:700,color:"#fb7185"}}>67</span>
                      <span style={{fontSize:15,color:"rgba(251,113,133,0.6)"}}>products</span>
                    </div>
                    <AlertTriangle size={24} color="#fb7185"/>
                  </div>
                </div>
              </div>

              {/* CHARTS */}
              <div style={{display:"grid",gridTemplateColumns:cols(3),gap:16,marginBottom:20}}>
                <div className="card" style={{display:"flex",flexDirection:"column",minHeight:290}}>
                  <div className="card-title">Sales Overview <button className="card-x"><X size={13}/></button></div>
                  <div className="tab-wrap" style={{marginBottom:16}}>
                    {["DAILY","MONTHLY","YEARLY"].map(t=>(
                      <button key={t} onClick={()=>setCtab(t)} className={ctab===t?"tab-on":"tab-off"}>{t}</button>
                    ))}
                  </div>
                  <div style={{flex:1,minHeight:190}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{top:0,right:0,left:-20,bottom:0}}>
                        <defs>
                          <linearGradient id="bG" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#047857" stopOpacity={0.35}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                        <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${v/1000}k`}/>
                        <Tooltip content={<CT/>} cursor={{fill:"rgba(255,255,255,0.03)"}}/>
                        <Bar dataKey="value" fill="url(#bG)" radius={[4,4,0,0]}/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{marginTop:10,fontSize:10,color:"rgba(255,255,255,0.2)",textAlign:"right"}}>Updated: March 6, 2026, 05:27 AM</div>
                </div>

                <div className="card" style={{display:"flex",flexDirection:"column",minHeight:290}}>
                  <div className="card-title">Profit & Loss <button className="card-x"><X size={13}/></button></div>
                  <div style={{flex:1,minHeight:190,position:"relative"}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={profitData} margin={{top:20,right:0,left:-20,bottom:0}}>
                        <defs>
                          <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}}/>
                        <YAxis axisLine={false} tickLine={false} tick={{fill:"rgba(255,255,255,0.28)",fontSize:11}} tickFormatter={v=>`₱${v/1000}k`}/>
                        <Tooltip content={<CT/>}/>
                        <ReferenceLine x="Jun" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4"/>
                        <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#aG)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                    <div style={{position:"absolute",top:"16%",left:"46%",background:"rgba(20,20,35,0.95)",border:"1px solid rgba(255,255,255,0.13)",borderRadius:10,padding:"8px 12px",boxShadow:"0 4px 20px rgba(0,0,0,0.5)"}}>
                      <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>₱15,000</div>
                      <div style={{fontSize:11,color:"#34d399",display:"flex",alignItems:"center",gap:4,marginTop:2}}><TrendingUp size={10}/> Trend Up</div>
                    </div>
                    <div style={{position:"absolute",bottom:6,right:2,fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.18)",letterSpacing:"0.07em"}}>AI FORECASTING</div>
                  </div>
                  <div style={{marginTop:10,fontSize:10,color:"rgba(255,255,255,0.2)",textAlign:"right"}}>Updated: March 6, 2026, 05:27 AM</div>
                </div>

                <div className="card" style={{display:"flex",flexDirection:"column",minHeight:290}}>
                  <div className="card-title">Best Selling Products <button className="card-x"><X size={13}/></button></div>
                  <div style={{flex:1,minHeight:190,position:"relative"}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={58} outerRadius={92} paddingAngle={3} dataKey="value" stroke="none" cornerRadius={4}>
                          {pieData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
                        </Pie>
                        <Tooltip content={<CT/>}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{position:"absolute",inset:0,pointerEvents:"none",fontSize:11}}>
                      <div style={{position:"absolute",top:"6%",left:"2%",color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>Nike Jacket<br/><span style={{color:"#fff",fontWeight:700}}>14.6%</span></div>
                      <div style={{position:"absolute",top:"6%",right:"2%",color:"rgba(255,255,255,0.5)",lineHeight:1.5,textAlign:"right"}}>Binatog<br/><span style={{color:"#fff",fontWeight:700}}>22.8%</span></div>
                      <div style={{position:"absolute",top:"43%",right:"2%",color:"rgba(255,255,255,0.5)",lineHeight:1.5,textAlign:"right"}}>Taho<br/><span style={{color:"#fff",fontWeight:700}}>13.7%</span></div>
                      <div style={{position:"absolute",bottom:"16%",left:"2%",color:"rgba(255,255,255,0.5)",lineHeight:1.5}}>Wireless Headset<br/><span style={{color:"#fff",fontWeight:700}}>18.3%</span></div>
                      <div style={{position:"absolute",bottom:"6%",right:"2%",color:"rgba(255,255,255,0.5)",lineHeight:1.5,textAlign:"right"}}>Iphone 15<br/><span style={{color:"#fff",fontWeight:700}}>30.6%</span></div>
                    </div>
                  </div>
                  <div style={{marginTop:10,fontSize:10,color:"rgba(255,255,255,0.2)",textAlign:"right"}}>Updated: March 6, 2026, 05:27 AM</div>
                </div>
              </div>

              {/* BOTTOM ROW */}
              <div style={{display:"grid",gridTemplateColumns:cols(3),gap:16,marginBottom:28}}>
                <div className="card">
                  <div className="card-title">Top Products <button className="card-x"><X size={13}/></button></div>
                  <div style={{display:"flex",flexDirection:"column",gap:18,marginTop:6}}>
                    {[{name:"Iphone 15",val:30.6},{name:"Wireless Headset",val:13.7},{name:"Binatog",val:22.8}].map(p=>(
                      <div key={p.name}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:8}}>
                          <span style={{color:"rgba(255,255,255,0.7)",fontWeight:500}}>{p.name}</span>
                          <span style={{color:"rgba(255,255,255,0.45)"}}>{p.val}%</span>
                        </div>
                        <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${p.val*2.5}%`,background:"linear-gradient(90deg,#34d399,#10b981)",borderRadius:99,boxShadow:"0 0 8px rgba(52,211,153,0.35)"}}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Expenses Overview <button className="card-x"><X size={13}/></button></div>
                  <div style={{display:"flex",flexDirection:"column",gap:14,marginTop:4}}>
                    {[{l:"TODAY'S EXPENSES",v:"₱10,040",I:BarChart3},{l:"MONTHLY EXPENSES",v:"₱450,067",I:Wallet}].map(e=>(
                      <div key={e.l} style={{padding:"16px 18px",borderRadius:13,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <p style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.3)",letterSpacing:"0.07em",marginBottom:6}}>{e.l}</p>
                          <p style={{fontSize:22,fontWeight:700,color:"#fb7185"}}>{e.v}</p>
                        </div>
                        <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(251,113,133,0.1)",border:"1px solid rgba(251,113,133,0.14)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <e.I size={18} color="#fb7185"/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <div className="card-title">Alerts <button className="card-x"><X size={13}/></button></div>
                  <div style={{marginTop:4}}>
                    {["Adidas Shirt - Low Stock","Taho - Low Stock","Iphone 16 - Low Stock","PS5 - Low Stock"].map(a=>(
                      <div key={a} className="alert-row"><AlertTriangle size={14} color="#fb7185" style={{flexShrink:0}}/>{a}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI FORECASTING HUB or sub-page */}
              {aiPage === "predict"
                ? <PredictSales onBack={()=>setAiPage(null)}/>
                : aiPage === "demand"
                ? <DemandForecasting onBack={()=>setAiPage(null)}/>
                : aiPage === "inventory"
                ? <InventoryPlanning onBack={()=>setAiPage(null)}/>
                : aiPage === "profit"
                ? <ProfitForecast onBack={()=>setAiPage(null)}/>
                : aiPage === "expense"
                ? <ExpensePrediction onBack={()=>setAiPage(null)}/>
                : aiPage === "customer"
                ? <CustomerBehavior onBack={()=>setAiPage(null)}/>
                : <AIHub onOpen={setAiPage}/>
              }
            </>
          )}

          {page==="Inventory"&&<Inventory/>}
          {page==="Sales"&&<Sales/>}
          {page==="Supplier"&&<Supplier/>}
          {page==="Finance"&&<Finance/>}
          {page==="User"&&<UserPage/>}
          {page==="Settings"&&<SettingsPage authName={authName} onNameChange={setAuthName} appColor={appColor} setAppColor={setAppColor} isDark={isDark} setIsDark={setIsDark}/>}
          {!["Dashboard","Inventory","Sales","Supplier","Finance","User","Settings"].includes(page)&&(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"55vh",textAlign:"center"}}>
              {(()=>{const I=icons[page];return <I size={40} color="rgba(255,255,255,0.12)" style={{marginBottom:16}}/>;})()}
              <h2 style={{fontSize:22,fontWeight:700,color:"#fff",marginBottom:8}}>{page}</h2>
              <p style={{color:"rgba(255,255,255,0.3)",fontSize:14}}>This section is currently under construction.</p>
            </div>
          )}
        </main>
      </div>
    </>
    </ToastProvider>
  );
}
