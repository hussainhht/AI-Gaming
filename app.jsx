const { useState, createContext, useContext } = React;

const GameContext = createContext();

const templates = [
  { id: 'flappy', name: 'Flappy Bird', img: 'https://placehold.co/300x200?text=Flappy' },
  { id: 'runner', name: 'Speed Runner', img: 'https://placehold.co/300x200?text=Runner' },
  { id: 'whack', name: 'Whack-a-Mole', img: 'https://placehold.co/300x200?text=Whack' },
  { id: 'match3', name: 'Match-3', img: 'https://placehold.co/300x200?text=Match3' },
  { id: 'crossy', name: 'Crossy Road', img: 'https://placehold.co/300x200?text=Crossy' }
];

function App() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState(null);
  const [prompts, setPrompts] = useState({ background:'', character:'', npcs:'', obstacles:'', bgm:'' });
  const [settings, setSettings] = useState({ difficulty:5, gravity:5, speed:5, gap:5, power:5 });

  const value = { step, setStep, template, setTemplate, prompts, setPrompts, settings, setSettings };

  let page = null;
  if(step===0) page = <HomePage/>;
  else if(step===1) page = <ReskinPage/>;
  else if(step===2) page = <SettingsPage/>;
  else page = <ExportPage/>;

  return (
    <GameContext.Provider value={value}>
      <div className="max-w-4xl mx-auto space-y-4">
        {page}
      </div>
    </GameContext.Provider>
  );
}

function GameCard({ template, onSelect }) {
  return (
    <div className="bg-white rounded shadow p-3 flex flex-col items-center">
      <img src={template.img} alt={template.name} className="w-full h-32 object-cover rounded" />
      <h3 className="mt-2 font-semibold">{template.name}</h3>
      <button onClick={()=>onSelect(template)} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Customize</button>
    </div>
  );
}

function HomePage() {
  const { setTemplate, setStep } = useContext(GameContext);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Choose a Game Template</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {templates.map(t => <GameCard key={t.id} template={t} onSelect={(tpl)=>{setTemplate(tpl);setStep(1);}} />)}
      </div>
    </div>
  );
}

function PromptForm() {
  const { prompts, setPrompts, setStep } = useContext(GameContext);
  const handleChange = e => setPrompts({ ...prompts, [e.target.name]: e.target.value });

  const fields = [
    {name:'background', label:'Background', icon:'🌄'},
    {name:'character', label:'Main Character', icon:'🧍'},
    {name:'npcs', label:'NPCs', icon:'🤖'},
    {name:'obstacles', label:'Obstacles', icon:'🚧'},
    {name:'bgm', label:'BGM', icon:'🎵'}
  ];

  return (
    <div className="space-y-4">
      {fields.map(f => (
        <div key={f.name}>
          <label className="block font-medium">{f.icon} {f.label}</label>
          <textarea
            name={f.name}
            rows="2"
            value={prompts[f.name]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder={`Describe ${f.label.toLowerCase()}`}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={()=>setStep(0)}>Back</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={()=>setStep(2)}>Next</button>
      </div>
    </div>
  );
}

function ReskinPage() {
  const { template } = useContext(GameContext);
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Reskin: {template.name}</h2>
      <PromptForm />
    </div>
  );
}

function SettingsPanel() {
  const { settings, setSettings, setStep } = useContext(GameContext);

  const update = (key, value) => setSettings({ ...settings, [key]: parseInt(value,10) });

  return (
    <div className="space-y-4">
      {[{k:'difficulty',label:'Difficulty'},
        {k:'gravity',label:'Gravity'},
        {k:'speed',label:'Speed'},
        {k:'gap',label:'Gap Between Obstacles'},
        {k:'power',label:'Power-up Frequency'}].map(({k,label}) => (
        <div key={k} className="flex items-center space-x-2">
          <label className="w-40">{label}</label>
          <input type="range" min="1" max="10" value={settings[k]} onChange={e=>update(k,e.target.value)} className="flex-grow" />
          <span className="w-6 text-right">{settings[k]}</span>
        </div>
      ))}
      <div className="flex justify-between">
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={()=>setStep(1)}>Back</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={()=>setStep(3)}>Next</button>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Game Settings</h2>
      <SettingsPanel />
    </div>
  );
}

function ExportButton() {
  const { template, prompts, settings } = useContext(GameContext);

  const exportZip = async () => {
    const zip = new JSZip();
    const html = `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>${template.name}</title></head><body><h1>${template.name}</h1><script>console.log('Game start');</script></body></html>`;
    zip.file('index.html', html);
    zip.file('prompts.json', JSON.stringify(prompts, null, 2));
    zip.file('settings.json', JSON.stringify(settings, null, 2));
    const blob = await zip.generateAsync({type:'blob'});
    saveAs(blob, 'game.zip');
  };

  return (
    <button onClick={exportZip} className="px-4 py-2 bg-green-600 text-white rounded">Download ZIP</button>
  );
}

function ExportPage() {
  const { setStep } = useContext(GameContext);
  return (
    <div className="p-4 space-y-4 text-center">
      <h2 className="text-xl font-semibold">Export Your Game</h2>
      <p>Click below to download your customized game.</p>
      <div className="flex justify-center gap-4">
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={()=>setStep(2)}>Back</button>
        <ExportButton />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
