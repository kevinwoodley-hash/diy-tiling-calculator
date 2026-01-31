import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Calculator, BookOpen, Home, ChevronDown, ChevronUp, Info, Package, Ruler, Save, Trash2, Image as ImageIcon, X } from 'lucide-react';

const DIYTilingApp = () => {
  // State management
  const [activeTab, setActiveTab] = useState('calculator');
  const [measurements, setMeasurements] = useState({
    length: '',
    width: '',
    tileLength: '',
    tileWidth: '',
    wastage: '10',
    wallOrFloor: 'wall'
  });
  
  const [results, setResults] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [showPhotoPreview, setShowPhotoPreview] = useState(null);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Load saved projects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('diyTilingProjects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  // UK Chain Tile Stores
  const tileStoreChains = [
    { name: "Topps Tiles", website: "https://www.toppstiles.co.uk", color: "#E63946" },
    { name: "Tile Giant", website: "https://www.tilegiant.co.uk", color: "#2A9D8F" },
    { name: "CTD Tiles", website: "https://www.ctdtiles.co.uk", color: "#264653" },
    { name: "Tile Mountain", website: "https://www.tilemountain.co.uk", color: "#E76F51" },
    { name: "Walls and Floors", website: "https://www.wallsandfloors.co.uk", color: "#F4A261" },
    { name: "Victorian Plumbing", website: "https://www.victorianplumbing.co.uk", color: "#8B5A3C" }
  ];

  // DIY Installation Guides
  const installationGuides = {
    wall: [
      {
        title: "Planning & Preparation",
        icon: "📋",
        steps: [
          "Measure your wall area carefully and draw a simple sketch",
          "Check walls are clean, dry, flat, and sound - remove any loose paint or wallpaper",
          "Mark the lowest point of your surface as your starting reference",
          "Plan your tile layout to avoid narrow cuts at edges - aim for symmetry",
          "Set out a dry run on the floor first to check your pattern"
        ]
      },
      {
        title: "Surface Preparation",
        icon: "🔨",
        steps: [
          "Fill any holes or cracks with suitable filler and allow to dry completely",
          "Sand down any bumps or high spots until surface is smooth",
          "For new plasterboard, apply a primer or PVA solution (diluted 1:5 with water)",
          "For shower/wet areas, install cement backer board or tanking membrane",
          "Ensure surface is dust-free before tiling - wipe with damp cloth"
        ]
      },
      {
        title: "Setting Out Your Tiles",
        icon: "📐",
        steps: [
          "Find the centre of your wall and mark a vertical line using a spirit level",
          "For kitchens, start from worktop level; for bathrooms, from bath/tray edge",
          "Use a tile batten (straight piece of wood) fixed horizontally as a guide",
          "Dry lay tiles to check spacing - use tile spacers for consistent gaps",
          "Adjust starting point to avoid thin cuts at corners or edges"
        ]
      },
      {
        title: "Applying Adhesive & Tiles",
        icon: "🎨",
        steps: [
          "Mix adhesive according to manufacturer's instructions - should be thick paste consistency",
          "Apply adhesive to wall using notched trowel at 45° angle - creates ridges",
          "Cover about 1 square metre at a time to prevent adhesive drying",
          "Press tiles firmly with slight twisting motion - adhesive should squash to 3mm",
          "Insert spacers between tiles for consistent grout lines (2-5mm typical)",
          "Check tiles are level as you go using spirit level - adjust before adhesive sets",
          "Remove excess adhesive from tile faces and grout lines immediately",
          "Allow adhesive to cure for 24 hours before grouting"
        ]
      },
      {
        title: "Cutting Tiles",
        icon: "✂️",
        steps: [
          "Measure carefully and mark cutting line with pencil on tile face",
          "For straight cuts, use a manual tile cutter (score and snap method)",
          "Place tile in cutter, score once firmly along line, then snap cleanly",
          "For L-shapes or curves, use a tile nipper taking small bites gradually",
          "Smooth rough edges with a rubbing stone or fine sandpaper",
          "Always wear safety glasses when cutting tiles"
        ]
      },
      {
        title: "Grouting",
        icon: "🧽",
        steps: [
          "Ensure adhesive is fully cured (24 hours minimum) and remove all spacers",
          "Mix grout to smooth, creamy consistency - not too runny or stiff",
          "Apply grout diagonally across tiles using rubber grout float",
          "Work grout into all joints, pressing firmly to fill completely",
          "Remove excess grout from tile surface with float at 45° angle",
          "Wait 15-20 minutes until grout starts to firm up",
          "Wipe tiles clean with damp (not wet) sponge in circular motions",
          "Polish off remaining haze with dry cloth when fully dry",
          "For wet areas, apply silicone sealant in corners and edges after 24 hours"
        ]
      },
      {
        title: "Finishing Touches",
        icon: "✨",
        steps: [
          "Allow grout to cure for 48 hours before getting wet",
          "Apply grout sealer in bathrooms/kitchens for extra protection (optional)",
          "Remove any grout haze with specialist cleaner if needed",
          "Apply silicone sealant where tiles meet bath, shower tray, or worktop",
          "Check all edges and corners are properly sealed against moisture",
          "Avoid heavy use for first 7 days to allow full cure"
        ]
      }
    ],
    floor: [
      {
        title: "Planning & Preparation",
        icon: "📋",
        steps: [
          "Measure your room carefully - length and width in metres",
          "Check floor is level using spirit level - max 3mm variation per metre",
          "Ensure subfloor is solid, clean, dry and capable of taking tile weight",
          "Remove any existing flooring, skirting boards if needed",
          "Plan tile layout from room centre for balanced appearance"
        ]
      },
      {
        title: "Floor Preparation",
        icon: "🔨",
        steps: [
          "Concrete floors: Fill cracks, remove loose material, vacuum thoroughly",
          "Wooden floors: Install 6mm cement backer board screwed every 300mm",
          "Check for damp - use damp meter or lay polythene sheet overnight",
          "Apply primer if required for your floor type and adhesive choice",
          "For underfloor heating, ensure system is off and temperature has stabilised",
          "Ensure room is well ventilated but maintain minimum 10°C temperature"
        ]
      },
      {
        title: "Setting Out Your Tiles",
        icon: "📐",
        steps: [
          "Find the centre of the room by measuring and marking halfway points",
          "Create centre lines using chalk line or pencil - they should cross at 90°",
          "Dry lay tiles from centre outwards to check layout and cuts needed",
          "Adjust lines if needed to avoid narrow cuts at doorways or walls",
          "Aim for cuts no smaller than half a tile width where possible",
          "Account for expansion gaps (10mm) around room perimeter"
        ]
      },
      {
        title: "Applying Adhesive & Tiles",
        icon: "🎨",
        steps: [
          "Use flexible floor tile adhesive suitable for your floor type",
          "Mix adhesive to thick, creamy consistency with no lumps",
          "Spread adhesive with notched trowel - 10mm notches for large tiles",
          "Work in small sections (1 square metre) to prevent skinning over",
          "Bed tiles firmly with slight twisting - use rubber mallet if needed",
          "Check tiles are level with each other using straight edge",
          "Insert spacers for consistent joints (typically 3-5mm for floors)",
          "Clean excess adhesive from joints immediately with damp sponge",
          "Walk on boards if you need to access tiled area before adhesive cures",
          "Allow 24-48 hours curing time before grouting"
        ]
      },
      {
        title: "Cutting Floor Tiles",
        icon: "✂️",
        steps: [
          "Measure precisely, accounting for spacer width in your measurements",
          "Mark cutting line clearly on tile surface with pencil",
          "Use manual tile cutter for straight cuts - score and snap method",
          "For thicker/harder tiles, consider hiring an electric tile cutter",
          "Make L-shaped cuts by scoring both lines then removing waste with nippers",
          "Cut slowly and carefully to avoid chipping - better to cut slightly large",
          "Test fit cut tiles before fixing - should fit with 2mm clearance for grout",
          "Smooth sharp edges with rubbing stone"
        ]
      },
      {
        title: "Grouting Floor Tiles",
        icon: "🧽",
        steps: [
          "Wait at least 24 hours after tiling before grouting",
          "Remove all tile spacers and clean joints of any adhesive residue",
          "Mix grout to smooth consistency - floor grout can be slightly stiffer",
          "Spread grout diagonally across tiles using rubber grout float",
          "Press grout firmly into all joints ensuring complete fill",
          "Remove excess grout from tile surface with float held at 45°",
          "Wait 15-30 minutes for grout to start firming up",
          "Clean tiles with barely damp sponge - rinse frequently",
          "Allow 24 hours before light traffic, 48 hours before heavy use",
          "Apply grout sealer after 2 weeks for extra protection"
        ]
      },
      {
        title: "Finishing & Expansion Joints",
        icon: "✨",
        steps: [
          "Leave 10mm expansion gap around all room edges - do not grout this",
          "Fill perimeter gap with flexible silicone sealant colour-matched to grout",
          "Install movement joints every 4-5 metres in large areas or doorways",
          "Refit skirting boards or use tile trim for neat finish at edges",
          "Clean off any grout haze with clean water and specialist cleaner if needed",
          "For natural stone, apply stone sealer once grout is fully cured",
          "Keep floor dry for first 72 hours - no washing or mopping",
          "Avoid dragging heavy furniture across new tiles for first week"
        ]
      }
    ]
  };

  // Material calculations
  const calculateMaterials = () => {
    const length = parseFloat(measurements.length);
    const width = parseFloat(measurements.width);
    const tileL = parseFloat(measurements.tileLength);
    const tileW = parseFloat(measurements.tileWidth);
    const wastage = parseFloat(measurements.wastage) / 100;

    if (!length || !width || !tileL || !tileW) {
      alert('Please fill in all measurements');
      return;
    }

    // Area calculations
    const totalArea = length * width;
    const tileArea = (tileL / 100) * (tileW / 100);
    const tilesNeeded = Math.ceil((totalArea / tileArea) * (1 + wastage));

    // Adhesive calculation (1 bag per 5m² for walls, 3m² for floors)
    const adhesiveCoverage = measurements.wallOrFloor === 'wall' ? 5 : 3;
    const adhesiveBags = Math.ceil(totalArea / adhesiveCoverage);

    // Grout calculation (1kg per 2m² approximate)
    const groutKg = Math.ceil(totalArea / 2);

    // Spacers (100 per m²)
    const spacers = Math.ceil(totalArea * 100);

    const results = {
      totalArea: totalArea.toFixed(2),
      tilesNeeded,
      adhesiveBags,
      groutKg,
      spacers,
      wastagePercent: measurements.wastage,
      costEstimate: {
        tiles: tilesNeeded * 2.5, // £2.50 average per tile
        adhesive: adhesiveBags * 15, // £15 per bag
        grout: groutKg * 8, // £8 per kg
        spacers: Math.ceil(spacers / 100) * 3, // £3 per 100
      }
    };

    results.costEstimate.total = 
      results.costEstimate.tiles + 
      results.costEstimate.adhesive + 
      results.costEstimate.grout + 
      results.costEstimate.spacers;

    setResults(results);
  };

  // Photo handling
  const handlePhotoCapture = async (e) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = await Promise.all(
        Array.from(files).map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({
              id: Date.now() + Math.random(),
              url: e.target.result,
              name: file.name,
              date: new Date().toISOString()
            });
            reader.readAsDataURL(file);
          });
        })
      );
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      alert('Unable to access camera. Please use the upload photo option.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      
      const photo = {
        id: Date.now(),
        url: canvas.toDataURL('image/jpeg'),
        name: `Photo_${new Date().toLocaleString()}`,
        date: new Date().toISOString()
      };
      
      setPhotos([...photos, photo]);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const deletePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  // Save project
  const saveProject = () => {
    const project = {
      id: Date.now(),
      date: new Date().toISOString(),
      measurements,
      results,
      photos: photos.length
    };
    
    const updated = [project, ...savedProjects].slice(0, 10); // Keep last 10
    setSavedProjects(updated);
    localStorage.setItem('diyTilingProjects', JSON.stringify(updated));
    alert('Project saved!');
  };

  // Get user location for store finder
  const findNearbyStores = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          alert('Please enable location services to find nearby stores');
        }
      );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%)',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      padding: '0',
      margin: '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2557 0%, #1e3c72 100%)',
        padding: '2rem 1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        borderBottom: '3px solid #fca311'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <Home size={40} color="#fca311" />
            <h1 style={{
              margin: 0,
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              DIY Tiling Calculator
            </h1>
          </div>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '1.1rem',
            color: '#e0e0e0',
            fontWeight: '300'
          }}>
            Your complete guide to successful tile installation
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0'
        }}>
          {[
            { id: 'calculator', icon: Calculator, label: 'Calculator' },
            { id: 'stores', icon: MapPin, label: 'Find Stores' },
            { id: 'photos', icon: Camera, label: 'Photos' },
            { id: 'guide', icon: BookOpen, label: 'How-To Guide' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: '1',
                minWidth: '150px',
                padding: '1rem',
                border: 'none',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #fca311 0%, #ff9f1c 100%)'
                  : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#333',
                fontSize: '1rem',
                fontWeight: activeTab === tab.id ? '700' : '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                borderBottom: activeTab === tab.id ? '3px solid #1e3c72' : '3px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(252,163,17,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#1e3c72',
                marginBottom: '1.5rem',
                fontWeight: '700'
              }}>
                Calculate Your Materials
              </h2>

              {/* Wall or Floor Selection */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Project Type
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['wall', 'floor'].map(type => (
                    <button
                      key={type}
                      onClick={() => setMeasurements({...measurements, wallOrFloor: type})}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        border: measurements.wallOrFloor === type ? '3px solid #fca311' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: measurements.wallOrFloor === type ? '#fff8e6' : 'white',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: measurements.wallOrFloor === type ? '#1e3c72' : '#666',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textTransform: 'capitalize'
                      }}
                    >
                      {type} Tiles
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {[
                  { key: 'length', label: 'Length (m)', icon: Ruler },
                  { key: 'width', label: 'Width (m)', icon: Ruler },
                  { key: 'tileLength', label: 'Tile Length (cm)', icon: Package },
                  { key: 'tileWidth', label: 'Tile Width (cm)', icon: Package },
                  { key: 'wastage', label: 'Wastage (%)', icon: Info }
                ].map(field => (
                  <div key={field.key}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      <field.icon size={18} color="#1e3c72" />
                      {field.label}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={measurements[field.key]}
                      onChange={(e) => setMeasurements({
                        ...measurements,
                        [field.key]: e.target.value
                      })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#fca311'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={calculateMaterials}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 4px 15px rgba(30,60,114,0.3)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Calculate Materials
              </button>
            </div>

            {/* Results */}
            {results && (
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <h2 style={{
                    fontSize: '1.8rem',
                    color: '#1e3c72',
                    margin: 0,
                    fontWeight: '700'
                  }}>
                    Materials Needed
                  </h2>
                  <button
                    onClick={saveProject}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#fca311',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <Save size={18} />
                    Save Project
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #e8f4f8 0%, #d4e9f7 100%)',
                    borderRadius: '10px',
                    borderLeft: '5px solid #1e3c72'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Total Area
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3c72' }}>
                      {results.totalArea} m²
                    </div>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #fff8e6 0%, #ffecb3 100%)',
                    borderRadius: '10px',
                    borderLeft: '5px solid #fca311'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Tiles Required
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3c72' }}>
                      {results.tilesNeeded}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                      (inc. {results.wastagePercent}% wastage)
                    </div>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                    borderRadius: '10px',
                    borderLeft: '5px solid #666'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Adhesive
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3c72' }}>
                      {results.adhesiveBags} bags
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                      {measurements.wallOrFloor === 'wall' ? '20kg per bag' : '20kg per bag'}
                    </div>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                    borderRadius: '10px',
                    borderLeft: '5px solid #4caf50'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Grout
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3c72' }}>
                      {results.groutKg} kg
                    </div>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                    borderRadius: '10px',
                    borderLeft: '5px solid #e91e63'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Tile Spacers
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e3c72' }}>
                      ~{Math.ceil(results.spacers / 100)} packs
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                      (100 per pack)
                    </div>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #e1f5e1 0%, #b9f6ca 100%)',
                    borderRadius: '10px',
                    borderLeft: '5px solid #00c853'
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                      Estimated Cost
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#00c853' }}>
                      £{results.costEstimate.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div style={{
                  background: '#f8f9fa',
                  padding: '1.5rem',
                  borderRadius: '8px'
                }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#1e3c72', marginBottom: '1rem' }}>
                    Cost Breakdown
                  </h3>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[
                      { label: 'Tiles', value: results.costEstimate.tiles },
                      { label: 'Adhesive', value: results.costEstimate.adhesive },
                      { label: 'Grout', value: results.costEstimate.grout },
                      { label: 'Spacers', value: results.costEstimate.spacers }
                    ].map(item => (
                      <div key={item.label} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid #ddd'
                      }}>
                        <span style={{ fontWeight: '500' }}>{item.label}</span>
                        <span style={{ fontWeight: '600', color: '#1e3c72' }}>
                          £{item.value.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    background: '#fff3cd',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    color: '#856404'
                  }}>
                    💡 <strong>Tip:</strong> Prices are estimates. Actual costs vary by brand and quality. 
                    Always buy 10-15% extra tiles for cuts and future repairs.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Store Finder Tab */}
        {activeTab === 'stores' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#1e3c72',
              marginBottom: '1.5rem',
              fontWeight: '700'
            }}>
              Find UK Tile Stores
            </h2>

            <div style={{
              background: '#e3f2fd',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              borderLeft: '5px solid #1e3c72'
            }}>
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>
                <strong>Find your nearest tile showroom:</strong> Visit these major UK tile retailers 
                to see tiles in person, get expert advice, and arrange delivery. Most stores offer 
                click & collect services and free design consultations.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {tileStoreChains.map(store => (
                <div
                  key={store.name}
                  style={{
                    background: `linear-gradient(135deg, ${store.color}15 0%, ${store.color}30 100%)`,
                    padding: '1.5rem',
                    borderRadius: '10px',
                    border: `2px solid ${store.color}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${store.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      background: store.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MapPin size={28} color="white" />
                    </div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#1e3c72'
                    }}>
                      {store.name}
                    </h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a
                      href={`${store.website}/store-finder`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1rem',
                        background: store.color,
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        textAlign: 'center',
                        transition: 'opacity 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      Find Nearest Store
                    </a>
                    
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.75rem 1rem',
                        background: 'white',
                        color: store.color,
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        textAlign: 'center',
                        border: `2px solid ${store.color}`,
                        transition: 'background 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = `${store.color}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                      }}
                    >
                      Browse Online
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: '#fff8e6',
              borderRadius: '8px',
              borderLeft: '5px solid #fca311'
            }}>
              <h3 style={{ fontSize: '1.2rem', color: '#1e3c72', marginBottom: '1rem' }}>
                💡 Shopping Tips
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                <li><strong>Visit showrooms:</strong> See tiles in different lighting before buying</li>
                <li><strong>Order samples:</strong> Most retailers offer free or cheap tile samples</li>
                <li><strong>Check stock:</strong> Call ahead to confirm availability of large orders</li>
                <li><strong>Compare prices:</strong> Check multiple stores - prices can vary significantly</li>
                <li><strong>Ask about delivery:</strong> Many offer free delivery over certain amounts</li>
                <li><strong>Look for sales:</strong> Tile retailers often have seasonal clearance sales</li>
              </ul>
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#1e3c72',
              marginBottom: '1.5rem',
              fontWeight: '700'
            }}>
              Project Photos
            </h2>

            <div style={{
              background: '#e3f2fd',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>
                📸 Document your tiling project! Take photos before, during, and after installation. 
                This helps track progress and provides a record for future reference or insurance.
              </p>
            </div>

            {/* Photo Upload Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <ImageIcon size={24} />
                Upload Photos
              </button>

              <button
                onClick={cameraActive ? stopCamera : startCamera}
                style={{
                  padding: '1.5rem',
                  background: cameraActive 
                    ? 'linear-gradient(135deg, #e63946 0%, #d62828 100%)'
                    : 'linear-gradient(135deg, #fca311 0%, #ff9f1c 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Camera size={24} />
                {cameraActive ? 'Stop Camera' : 'Take Photo'}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoCapture}
              style={{ display: 'none' }}
            />

            {/* Camera View */}
            {cameraActive && (
              <div style={{
                marginBottom: '2rem',
                background: '#000',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    maxHeight: '500px',
                    display: 'block'
                  }}
                />
                <button
                  onClick={capturePhoto}
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '1rem 2rem',
                    background: '#fca311',
                    color: 'white',
                    border: '3px solid white',
                    borderRadius: '50px',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                  }}
                >
                  📸 Capture
                </button>
              </div>
            )}

            {/* Photo Gallery */}
            {photos.length > 0 ? (
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#1e3c72', marginBottom: '1rem' }}>
                  Your Photos ({photos.length})
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  {photos.map(photo => (
                    <div
                      key={photo.id}
                      style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease'
                      }}
                      onClick={() => setShowPhotoPreview(photo)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePhoto(photo.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          padding: '0.5rem',
                          background: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                      <div style={{
                        padding: '0.75rem',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        fontSize: '0.85rem'
                      }}>
                        {new Date(photo.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                color: '#666'
              }}>
                <Camera size={64} color="#ccc" style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', margin: 0 }}>
                  No photos yet. Start documenting your project!
                </p>
              </div>
            )}

            {/* Photo Preview Modal */}
            {showPhotoPreview && (
              <div
                onClick={() => setShowPhotoPreview(null)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  padding: '2rem'
                }}
              >
                <button
                  onClick={() => setShowPhotoPreview(null)}
                  style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    padding: '1rem',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={24} />
                </button>
                <img
                  src={showPhotoPreview.url}
                  alt={showPhotoPreview.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        )}

        {/* Installation Guide Tab */}
        {activeTab === 'guide' && (
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#1e3c72',
                marginBottom: '1rem',
                fontWeight: '700'
              }}>
                DIY Tile Installation Guide
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Complete step-by-step instructions for tiling walls and floors. Follow these guides 
                for professional-looking results on your first attempt!
              </p>

              {/* Wall vs Floor Selection */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                {['wall', 'floor'].map(type => (
                  <button
                    key={type}
                    onClick={() => setMeasurements({...measurements, wallOrFloor: type})}
                    style={{
                      flex: 1,
                      padding: '1.25rem',
                      border: measurements.wallOrFloor === type ? '3px solid #fca311' : '2px solid #ddd',
                      borderRadius: '10px',
                      background: measurements.wallOrFloor === type 
                        ? 'linear-gradient(135deg, #fff8e6 0%, #ffecb3 100%)'
                        : 'white',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: measurements.wallOrFloor === type ? '#1e3c72' : '#666',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type} Installation
                  </button>
                ))}
              </div>
            </div>

            {/* Installation Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {installationGuides[measurements.wallOrFloor].map((section, index) => (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    border: expandedGuide === index ? '2px solid #fca311' : '2px solid #e0e0e0'
                  }}
                >
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === index ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      background: expandedGuide === index 
                        ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                        : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        background: expandedGuide === index ? '#fca311' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: expandedGuide === index ? 'white' : '#1e3c72',
                        border: '2px solid ' + (expandedGuide === index ? '#fca311' : '#ddd')
                      }}>
                        {index + 1}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{
                          fontSize: '1.8rem',
                          marginBottom: '0.25rem'
                        }}>
                          {section.icon}
                        </div>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          color: expandedGuide === index ? 'white' : '#1e3c72'
                        }}>
                          {section.title}
                        </div>
                      </div>
                    </div>
                    {expandedGuide === index ? 
                      <ChevronUp size={28} color="white" /> : 
                      <ChevronDown size={28} color="#1e3c72" />
                    }
                  </button>

                  {expandedGuide === index && (
                    <div style={{
                      padding: '2rem',
                      background: 'white',
                      animation: 'slideDown 0.3s ease-out'
                    }}>
                      <ol style={{
                        margin: 0,
                        padding: '0 0 0 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                      }}>
                        {section.steps.map((step, stepIndex) => (
                          <li
                            key={stepIndex}
                            style={{
                              fontSize: '1.05rem',
                              lineHeight: '1.7',
                              color: '#333',
                              paddingLeft: '0.5rem'
                            }}
                          >
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Safety & Tips Section */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              marginTop: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#1e3c72',
                marginBottom: '1.5rem',
                fontWeight: '700'
              }}>
                ⚠️ Important Safety & Top Tips
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: '#fff3cd',
                  borderRadius: '8px',
                  borderLeft: '5px solid #ffc107'
                }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e3c72' }}>
                    🦺 Safety First
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.7' }}>
                    <li>Always wear safety glasses when cutting tiles</li>
                    <li>Use knee pads for floor work</li>
                    <li>Ensure good ventilation when using adhesives</li>
                    <li>Wear gloves - grout can irritate skin</li>
                    <li>Keep work area clean to avoid slips</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: '#d1ecf1',
                  borderRadius: '8px',
                  borderLeft: '5px solid #17a2b8'
                }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e3c72' }}>
                    💡 Pro Tips
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.7' }}>
                    <li>Don't rush - take time to get it right</li>
                    <li>Mix only what adhesive you can use in 20 mins</li>
                    <li>Check level constantly as you work</li>
                    <li>Keep tiles from same batch together</li>
                    <li>Clean as you go - dried adhesive is hard to remove</li>
                  </ul>
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: '#f8d7da',
                  borderRadius: '8px',
                  borderLeft: '5px solid #dc3545'
                }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e3c72' }}>
                    ❌ Common Mistakes
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.7' }}>
                    <li>Not preparing surface properly</li>
                    <li>Using wrong adhesive for tile type</li>
                    <li>Grouting before adhesive fully cures</li>
                    <li>Not leaving expansion gaps</li>
                    <li>Skipping the dry layout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2557 0%, #1e3c72 100%)',
        padding: '2rem 1rem',
        marginTop: '3rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '1rem' }}>
          🏠 DIY Tiling Calculator - Your Complete Tiling Companion
        </p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
          Calculate materials • Find stores • Document progress • Learn techniques
        </p>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DIYTilingApp;