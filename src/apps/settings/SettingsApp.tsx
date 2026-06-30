import React, { useState } from 'react';
import { SettingsIcon, PaletteIcon, MonitorIcon, AccessibilityIcon, CpuIcon, InfoIcon } from 'lucide-react';
import { useSettings } from '../../core/settings-manager';

const tabs = [
  { id: 'personalization', label: 'Personalization', icon: PaletteIcon },
  { id: 'system', label: 'System', icon: MonitorIcon },
  { id: 'accessibility', label: 'Accessibility', icon: AccessibilityIcon },
  { id: 'performance', label: 'Performance', icon: CpuIcon },
  { id: 'about', label: 'About', icon: InfoIcon },
];

export const SettingsApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personalization');
  const { settings, updateSetting } = useSettings();

  const handleWallpaperChange = (wallpaper: string) => {
    updateSetting('wallpaper', wallpaper as any);
  };

  return (
    <div className="w-full h-full bg-[#1c1c1e] text-[#f5f5f7] flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#2c2c2e] border-r border-[#3a3a3c] flex flex-col p-4 gap-2">
        <div className="flex items-center gap-3 px-2 pb-4 border-b border-[#3a3a3c] mb-2">
          <SettingsIcon size={20} className="text-[#0a84ff]" />
          <h1 className="font-bold text-lg">Settings</h1>
        </div>
        
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#0a84ff] text-white' 
                  : 'text-[#ebebf5]/60 hover:bg-[#3a3a3c] hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#1c1c1e]">
        <div className="max-w-2xl flex flex-col gap-8">
          <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>

          {activeTab === 'personalization' && (
            <div className="flex flex-col gap-6">
              <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-[#3a3a3c]">
                <h3 className="font-bold mb-4">Wallpaper</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => handleWallpaperChange('default')}
                    aria-label="Default Wallpaper"
                    className={`aspect-video bg-gradient-to-br from-[#111827] to-[#1e1b4b] rounded-lg cursor-pointer transition-all ${settings.wallpaper === 'default' ? 'ring-2 ring-[#0a84ff] scale-105' : 'hover:ring-2 hover:ring-white/50 hover:scale-105'}`} 
                  />
                  <button 
                    onClick={() => handleWallpaperChange('ocean')}
                    aria-label="Ocean Wallpaper"
                    className={`aspect-video bg-[linear-gradient(135deg,#0f2027_0%,#203a43_50%,#2c5364_100%)] rounded-lg cursor-pointer transition-all ${settings.wallpaper === 'ocean' ? 'ring-2 ring-[#0a84ff] scale-105' : 'hover:ring-2 hover:ring-white/50 hover:scale-105'}`} 
                  />
                  <button 
                    onClick={() => handleWallpaperChange('sunset')}
                    aria-label="Sunset Wallpaper"
                    className={`aspect-video bg-[linear-gradient(135deg,#1f005c_0%,#5b0060_20%,#870160_40%,#ac255e_60%,#ca485c_80%,#e16b5c_100%)] rounded-lg cursor-pointer transition-all ${settings.wallpaper === 'sunset' ? 'ring-2 ring-[#0a84ff] scale-105' : 'hover:ring-2 hover:ring-white/50 hover:scale-105'}`} 
                  />
                </div>
              </div>

              <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-[#3a3a3c]">
                <h3 className="font-bold mb-4">Accent Color</h3>
                <div className="flex gap-4">
                  <button aria-label="Blue Accent" className="w-8 h-8 rounded-full bg-[#0a84ff] ring-2 ring-white ring-offset-2 ring-offset-[#2c2c2e]" />
                  <button aria-label="Green Accent" className="w-8 h-8 rounded-full bg-[#30d158] hover:scale-110 transition-transform" />
                  <button aria-label="Orange Accent" className="w-8 h-8 rounded-full bg-[#ff9f0a] hover:scale-110 transition-transform" />
                  <button aria-label="Red Accent" className="w-8 h-8 rounded-full bg-[#ff453a] hover:scale-110 transition-transform" />
                  <button aria-label="Purple Accent" className="w-8 h-8 rounded-full bg-[#bf5af2] hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-[#3a3a3c]">
                <h3 className="font-bold mb-4">Platform Theme</h3>
                <div className="flex gap-4">
                  {(['auto', 'windows', 'macos', 'linux'] as const).map(theme => (
                    <button 
                      key={theme}
                      onClick={() => updateSetting('platformTheme', theme)}
                      aria-label={`${theme} theme`}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                        settings.platformTheme === theme 
                          ? 'bg-[#0a84ff] text-white' 
                          : 'bg-[#3a3a3c] text-[#ebebf5]/60 hover:text-white'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#ebebf5]/40 mt-3">
                  Auto dynamically detects your device. Manually selecting a theme will lock the Desktop Shell (this does not apply to Mobile/Tablet).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="bg-[#2c2c2e] p-5 rounded-2xl border border-[#3a3a3c] flex flex-col gap-4">
              <div className="flex justify-between items-center py-2 border-b border-[#3a3a3c]">
                <span>System Version</span>
                <span className="text-[#ebebf5]/60">PrathamOS 1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#3a3a3c]">
                <span>Kernel</span>
                <span className="text-[#ebebf5]/60">Foundry Engine</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Developer Mode</span>
                <button aria-label="Toggle Developer Mode" className="w-12 h-6 bg-[#30d158] rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
              <p className="text-xs text-[#ebebf5]/40 mt-2">
                Press Ctrl + Shift + D to toggle Developer Mode overlay globally.
              </p>
            </div>
          )}

          {(activeTab === 'accessibility' || activeTab === 'performance' || activeTab === 'about') && (
            <div className="flex flex-col items-center justify-center p-12 text-[#ebebf5]/50 text-center gap-4 border border-dashed border-[#3a3a3c] rounded-2xl">
              <InfoIcon size={48} className="opacity-50" />
              <p>These settings are managed centrally by the Foundry architecture.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
