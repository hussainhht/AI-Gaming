const { useState, createContext, useContext } = React;

const GameContext = createContext();

const templates = [
  { name: 'Flappy Bird', img: 'https://picsum.photos/seed/flappy/200/120' },
  { name: 'Speed Runner', img: 'https://picsum.photos/seed/runner/200/120' },
  { name: 'Whack-a-Mole', img: 'https://picsum.photos/seed/mole/200/120' },
  { name: 'Match-3', img: 'https://picsum.photos/seed/match3/200/120' },
  { name: 'Crossy Road', img: 'https://picsum.photos/seed/crossy/200/120' }
];

function App() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState(null);
  const [reskin, setReskin] = useState({ background: '', character: '', npcs: '', obstacles: '' });
  const [params, setParams] = useState({ difficulty: 5, speed: 5, gravity: 5, powerUps: 5 });
  const [music, setMusic] = useState('');

  const value = { step, setStep, template, setTemplate, reskin, setReskin, params, setParams, music, setMusic };

  let content;
  if (step === 0) content = <TemplateSelect />;
  else if (step === 1) content = <ReskinPage />;
  else if (step === 2) content = <ParametersPage />;
  else content = <ExportPage />;

  return (
    <GameContext.Provider value={value}>
      <div className="max-w-4xl mx-auto p-4">{content}</div>
    </GameContext.Provider>
  );
}

function TemplateSelect() {
  const { setTemplate, setStep } = useContext(GameContext);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Choose a Game Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <div key={t.name} className="bg-white shadow rounded p-2 flex flex-col items-center">
            <img src={t.img} alt={t.name} className="w-full h-32 object-cover"/>
            <div className="mt-2 font-semibold">{t.name}</div>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={() => { setTemplate(t.name); setStep(1); }}>
              Customize
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReskinPage() {
  const { reskin, setReskin, setStep } = useContext(GameContext);
  const update = (key, value) => setReskin({ ...reskin, [key]: value });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Reskin Prompts</h1>
      {['background','character','npcs','obstacles'].map(k => (
        <div key={k}>
          <label className="block capitalize font-semibold">{k}</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="2"
            value={reskin[k]}
            onChange={e => update(k, e.target.value)}
            placeholder={`Describe ${k}`}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setStep(0)}>Back</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => setStep(2)}>Next</button>
      </div>
    </div>
  );
}

function ParametersPage() {
  const { params, setParams, setStep, music, setMusic } = useContext(GameContext);
  const update = (key, value) => setParams({ ...params, [key]: parseInt(value, 10) });
  const suggest = () => setParams({ difficulty: 3, speed: 6, gravity: 4, powerUps: 5 });
  const genMusic = () => setMusic('ai-music.mp3');
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Game Parameters</h1>
      {[
        {k:'difficulty', label:'Difficulty'},
        {k:'speed', label:'Speed'},
        {k:'gravity', label:'Gravity'},
        {k:'powerUps', label:'Power-up Frequency'}
      ].map(({k,label}) => (
        <div key={k} className="flex items-center space-x-2">
          <label className="w-40">{label}</label>
          <input type="range" min="1" max="10" value={params[k]} onChange={e => update(k, e.target.value)} className="flex-grow"/>
          <span className="w-8 text-right">{params[k]}</span>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <label className="w-40">Background Music</label>
        <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={genMusic}>Generate</button>
        {music && <span className="ml-2">{music}</span>}
      </div>
      <div className="flex justify-between pt-2">
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setStep(1)}>Back</button>
        <div>
          <button className="mr-2 px-3 py-1 bg-purple-500 text-white rounded" onClick={suggest}>Suggest</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => setStep(3)}>Next</button>
        </div>
      </div>
    </div>
  );
}

function ExportPage() {
  const { template, reskin, params, music, setStep } = useContext(GameContext);
  const generateZip = async () => {
    const zip = new JSZip();
    const html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>${template}</title></head><body><h1>${template}</h1><p>Game placeholder.</p></body></html>`;
    zip.file('index.html', html);
    zip.file('prompts.json', JSON.stringify(reskin, null, 2));
    zip.file('parameters.json', JSON.stringify(params, null, 2));
    if (music) {
      zip.file('music.txt', music);
    }
    const content = await zip.generateAsync({type:'blob'});
    saveAs(content, 'game.zip');
  };
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Export Game</h1>
      <p className="font-semibold">Template: {template}</p>
      <pre className="bg-gray-200 p-2"><code>{JSON.stringify({reskin, params, music}, null, 2)}</code></pre>
      <div className="flex justify-between">
        <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setStep(2)}>Back</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={generateZip}>Download ZIP</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
