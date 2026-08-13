import React, { useState } from 'react';
import { calculateGrannyGrid } from '../lib/crochetEngine';

const CATALOG = [
  // 20 TOPS
  { id: 't1', name: 'Bralette Crop Top', category: 'top', panels: ['Front Cup Left', 'Front Cup Right', 'Back Band'] },
  { id: 't2', name: 'Boho Halter Top', category: 'top', panels: ['Front Bodice', 'Neck Ties', 'Back Ties'] },
  { id: 't3', name: 'Corset Tank', category: 'top', panels: ['Front Panel', 'Side Left', 'Side Right', 'Back Lacing'] },
  { id: 't4', name: 'Peplum Cami', category: 'top', panels: ['Upper Bodice', 'Lower Skirt Ruffle', 'Straps'] },
  { id: 't5', name: 'Mesh Beach Cover Top', category: 'top', panels: ['Front Panel', 'Back Panel'] },
  { id: 't6', name: 'Keyhole Tank', category: 'top', panels: ['Front Main', 'Neck Band', 'Back Main'] },
  { id: 't7', name: 'Square Neck Cami', category: 'top', panels: ['Front Panel', 'Back Panel', 'Straps'] },
  { id: 't8', name: 'Tie-Front Cardigan Crop', category: 'top', panels: ['Front Left', 'Front Right', 'Back Panel'] },
  { id: 't9', name: 'Asymmetric Shoulder Top', category: 'top', panels: ['Front Panel', 'Back Panel', 'Single Strap'] },
  { id: 't10', name: 'V-Neck Summer Vest', category: 'top', panels: ['Front Left V', 'Front Right V', 'Back Panel'] },
  { id: 't11', name: 'Ribbed Tank Top', category: 'top', panels: ['Front Ribbing', 'Back Ribbing'] },
  { id: 't12', name: 'Ruffled Shoulder Top', category: 'top', panels: ['Main Bodice', 'Shoulder Ruffles'] },
  { id: 't13', name: 'Tube Top Bandeau', category: 'top', panels: ['Main Body Panel', 'Top Elastic Border'] },
  { id: 't14', name: 'Cross-Back Halter', category: 'top', panels: ['Front Panel', 'Cross Straps'] },
  { id: 't15', name: 'Granny Triangle Top', category: 'top', panels: ['Triangle Left', 'Triangle Right', 'Bottom Strap'] },
  { id: 't16', name: 'Cap Sleeve Blouse', category: 'top', panels: ['Front Body', 'Back Body', 'Sleeve Left', 'Sleeve Right'] },
  { id: 't17', name: 'Festival Fringe Top', category: 'top', panels: ['Main Panel', 'Fringe Edge'] },
  { id: 't18', name: 'High-Neck Crop', category: 'top', panels: ['Front High Neck', 'Back Panel'] },
  { id: 't19', name: 'Corset Busk Top', category: 'top', panels: ['Front Panel', 'Side Panels', 'Back Panels'] },
  { id: 't20', name: 'Longline Tank', category: 'top', panels: ['Front Panel', 'Back Panel'] },

  // 10 SWEATERS
  { id: 's1', name: 'Classic Crewneck Sweater', category: 'sweater', panels: ['Front Panel', 'Back Panel', 'Sleeve Left', 'Sleeve Right'] },
  { id: 's2', name: 'Oversized Slouchy Cardigan', category: 'sweater', panels: ['Back Panel', 'Front Left', 'Front Right', 'Sleeve Left', 'Sleeve Right'] },
  { id: 's3', name: 'Turtleneck Jumper', category: 'sweater', panels: ['Front Panel', 'Back Panel', 'Sleeve Left', 'Sleeve Right', 'Collar'] },
  { id: 's4', name: 'Cropped Bell-Sleeve Sweater', category: 'sweater', panels: ['Front Panel', 'Back Panel', 'Bell Sleeve Left', 'Bell Sleeve Right'] },
  { id: 's5', name: 'Hooded Pullover', category: 'sweater', panels: ['Front Panel', 'Back Panel', 'Sleeves', 'Hood Panel'] },
  { id: 's6', name: 'V-Neck Pullover', category: 'sweater', panels: ['Front Left V', 'Front Right V', 'Back Panel', 'Sleeves'] },
  { id: 's7', name: 'Button-Down Cardigan', category: 'sweater', panels: ['Back Panel', 'Front Left Band', 'Front Right Band', 'Sleeves'] },
  { id: 's8', name: 'Off-Shoulder Sweater', category: 'sweater', panels: ['Front Bodice', 'Back Bodice', 'Sleeves', 'Fold Collar'] },
  { id: 's9', name: 'Balloon Sleeve Jumper', category: 'sweater', panels: ['Front Panel', 'Back Panel', 'Gathered Sleeve L', 'Gathered Sleeve R'] },
  { id: 's10', name: 'Duster Coat Sweater', category: 'sweater', panels: ['Long Back Panel', 'Front Left Long', 'Front Right Long', 'Sleeves'] },

  // 5 SHORTS
  { id: 'sh1', name: 'High-Waisted Festival Shorts', category: 'shorts', panels: ['Front Left Leg', 'Front Right Leg', 'Back Left Leg', 'Back Right Leg', 'Waistband'] },
  { id: 'sh2', name: 'Drawstring Lounge Shorts', category: 'shorts', panels: ['Front Left', 'Front Right', 'Back Left', 'Back Right', 'Drawstring'] },
  { id: 'sh3', name: 'Scalloped Edge Shorts', category: 'shorts', panels: ['Front Left', 'Front Right', 'Back Left', 'Back Right', 'Scallop Trim'] },
  { id: 'sh4', name: 'Biker Style Shorts', category: 'shorts', panels: ['Front Panel Left', 'Front Panel Right', 'Back Panel Left', 'Back Panel Right'] },
  { id: 'sh5', name: 'Granny Square Shorts', category: 'shorts', panels: ['Front Grid', 'Back Grid', 'Crotch Gusset', 'Waist Cinch'] },

  // 5 PANTS
  { id: 'p1', name: 'Wide-Leg Flare Pants', category: 'pants', panels: ['Front Left Leg', 'Front Right Leg', 'Back Left Leg', 'Back Right Leg'] },
  { id: 'p2', name: 'Straight Cut Trousers', category: 'pants', panels: ['Front Left Leg', 'Front Right Leg', 'Back Left Leg', 'Back Right Leg', 'Waist Band'] },
  { id: 'p3', name: 'Bell Bottom Pants', category: 'pants', panels: ['Upper Leg Left', 'Upper Leg Right', 'Lower Flare Left', 'Lower Flare Right'] },
  { id: 'p4', name: 'Beach Cover Pants', category: 'pants', panels: ['Front Leg Left', 'Front Leg Right', 'Back Leg Left', 'Back Leg Right'] },
  { id: 'p5', name: 'Granny Square Motif Pants', category: 'pants', panels: ['Left Leg Grid', 'Right Leg Grid', 'Waistband', 'Gusset'] },

  // 5 SKIRTS
  { id: 'sk1', name: 'A-Line Mini Skirt', category: 'skirt', panels: ['Front Panel', 'Back Panel', 'Waistband'] },
  { id: 'sk2', name: 'Maxi Tiered Skirt', category: 'skirt', panels: ['Top Tier', 'Middle Tier', 'Bottom Tier', 'Waistband'] },
  { id: 'sk3', name: 'Wrap Around Skirt', category: 'skirt', panels: ['Main Wrap Panel', 'Tie Straps'] },
  { id: 'sk4', name: 'Pencil Bodycon Skirt', category: 'skirt', panels: ['Front Panel', 'Back Panel', 'Elastic Band'] },
  { id: 'sk5', name: 'Granny Square Midi Skirt', category: 'skirt', panels: ['Front Grid', 'Back Grid', 'Waistband'] },

  // 5 HATS
  { id: 'h1', name: 'Classic Bucket Hat', category: 'hat', panels: ['Crown Circle', 'Side Wall', 'Brim'] },
  { id: 'h2', name: 'Slouchy Beanie', category: 'hat', panels: ['Main Body Tube', 'Crown Decrease'] },
  { id: 'h3', name: 'Wide Brim Sun Hat', category: 'hat', panels: ['Crown Circle', 'Side Wall', 'Wide Brim'] },
  { id: 'h4', name: 'Beret Hat', category: 'hat', panels: ['Top Circle', 'Under Brim', 'Ribbed Band'] },
  { id: 'h5', name: 'Granny Square Bucket Hat', category: 'hat', panels: ['Top Granny Square', 'Side 4 Granny Squares', 'Brim'] },

  // 5 ACCESSORIES
  { id: 'a1', name: 'Granny Square Tote Bag', category: 'accessory', panels: ['Front Grid', 'Back Grid', 'Bottom Gusset', 'Strap Left', 'Strap Right'] },
  { id: 'a2', name: 'Fringed Shawl Wrap', category: 'accessory', panels: ['Main Triangle', 'Fringe Trim'] },
  { id: 'a3', name: 'Crossbody Purse', category: 'accessory', panels: ['Front Flap', 'Back Panel', 'Side Gusset', 'Long Strap'] },
  { id: 'a4', name: 'Winter Scarf', category: 'accessory', panels: ['Main Rectangle Panel', 'End Tassels'] },
  { id: 'a5', name: 'Fingerless Gloves', category: 'accessory', panels: ['Palm Panel Left', 'Palm Panel Right', 'Thumb Cuff Left', 'Thumb Cuff Right'] }
];

const PALETTES = [
  { name: 'Soft Pastels', colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'] },
  { name: 'Earthy Warmth', colors: ['#DDA15E', '#BC6C25', '#283618', '#606C38', '#FEFAE0'] },
  { name: 'Ocean Breeze', colors: ['#0077B6', '#0096C7', '#57CC99', '#80ED99', '#C7F9CC'] },
  { name: 'Berry Crush', colors: ['#7209B7', '#F72585', '#4CC9F0', '#4361EE', '#3A0CA3'] }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('top');
  const [selectedItem, setSelectedItem] = useState(CATALOG[0]);
  const [isGrannyMode, setIsGrannyMode] = useState(false);
  const [bustCm, setBustCm] = useState(90);
  const [lengthCm, setLengthCm] = useState(45);
  const [primarySquareCm, setPrimarySquareCm] = useState(10);
  const [secondarySquareCm, setSecondarySquareCm] = useState(5);
  const [activePalette, setActivePalette] = useState(PALETTES[0]);

  const filteredItems = CATALOG.filter(item => item.category === selectedCategory);

  const gridData = calculateGrannyGrid(
    { bustCm, lengthCm, easeCm: 4 },
    { primaryCm: primarySquareCm, secondaryCm: secondarySquareCm }
  );

  return (
    <div style={{ padding: '16px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#FAF7F5', color: '#2D2A26', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', color: '#6B46C1', margin: '0 0 8px 0' }}>Crochet Garment Customizer</h1>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Design custom panel or granny square garments fitted to your exact body measurements.</p>
      </header>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {['top', 'sweater', 'shorts', 'pants', 'skirt', 'hat', 'accessory'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedItem(CATALOG.find(i => i.category === cat));
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === cat ? '#6B46C1' : '#E9D8FD',
              color: selectedCategory === cat ? '#FFFFFF' : '#4A5568',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}s
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Controls Section */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>1. Select Pattern ({filteredItems.length} available)</label>
          <select 
            value={selectedItem.id} 
            onChange={(e) => setSelectedItem(CATALOG.find(i => i.id === e.target.value))}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E0', marginBottom: '16px' }}
          >
            {filteredItems.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '12px', backgroundColor: '#F7FAFC', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              id="grannyToggle" 
              checked={isGrannyMode} 
              onChange={(e) => setIsGrannyMode(e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="grannyToggle" style={{ fontWeight: 'bold', fontSize: '14px' }}>Convert to Granny Square Project</label>
          </div>

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Body Bust/Width: {bustCm} cm</label>
          <input type="range" min="60" max="160" value={bustCm} onChange={(e) => setBustCm(Number(e.target.value))} style={{ width: '100%', marginBottom: '16px' }} />

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Garment Length: {lengthCm} cm</label>
          <input type="range" min="20" max="120" value={lengthCm} onChange={(e) => setLengthCm(Number(e.target.value))} style={{ width: '100%', marginBottom: '16px' }} />

          {isGrannyMode && (
            <div style={{ padding: '12px', backgroundColor: '#FAF5FF', borderRadius: '8px', marginBottom: '16px', border: '1px solid #E9D8FD' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Granny Square Mix Sizes</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '12px' }}>Main Size</span>
                  <select value={primarySquareCm} onChange={(e) => setPrimarySquareCm(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px' }}>
                    <option value={8}>8 cm</option>
                    <option value={10}>10 cm</option>
                    <option value={12}>12 cm</option>
                    <option value={15}>15 cm</option>
                  </select>
                </div>
                <div>
                  <span style={{ fontSize: '12px' }}>Accent Size</span>
                  <select value={secondarySquareCm} onChange={(e) => setSecondarySquareCm(Number(e.target.value))} style={{ width: '100%', padding: '6px', borderRadius: '6px' }}>
                    <option value={0}>None</option>
                    <option value={4}>4 cm</option>
                    <option value={5}>5 cm</option>
                    <option value={6}>6 cm</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Color Palette</label>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {PALETTES.map(p => (
              <button
                key={p.name}
                onClick={() => setActivePalette(p)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: activePalette.name === p.name ? '2px solid #6B46C1' : '1px solid #E2E8F0',
                  backgroundColor: '#FFF',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Preview Section */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', margin: '0 0 12px 0' }}>Visual Blueprint</h2>
          
          <div style={{ minHeight: '220px', backgroundColor: '#F7FAFC', border: '2px dashed #E2E8F0', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!isGrannyMode ? (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {selectedItem.panels.map((panel, idx) => (
                  <div key={idx} style={{ padding: '16px 12px', backgroundColor: activePalette.colors[idx % activePalette.colors.length], color: '#FFF', fontWeight: 'bold', borderRadius: '6px', fontSize: '12px', textAlign: 'center' }}>
                    {panel}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridData.columns}, 1fr)`, gap: '4px' }}>
                {Array.from({ length: gridData.columns * gridData.rows }).map((_, i) => (
                  <div key={i} style={{ width: '36px', height: '36px', backgroundColor: activePalette.colors[i % activePalette.colors.length], borderRadius: '4px', border: '1px solid #FFF' }} />
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '15px', margin: '0 0 8px 0' }}>Assembly Steps</h3>
            {isGrannyMode ? (
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4A5568' }}>
                {gridData.sewingSequence.map((step, i) => (
                  <p key={i} style={{ margin: '0 0 6px 0' }}>• {step}</p>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#4A5568', margin: 0 }}>
                Crochet all {selectedItem.panels.length} panel pieces using your chosen color sequence. Block pieces to {bustCm / 2}cm width x {lengthCm}cm height. Join shoulder seams using mattress stitch, join side seams, and add ribbed edging to lock final dimensions.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
