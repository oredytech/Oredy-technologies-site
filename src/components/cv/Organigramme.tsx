import { AudioLines, Cpu } from 'lucide-react';

const fabromLogoUrl = '/assets/fabrom-logo.png';

type Pole = {
  name: string;
  activity: string;
  website?: string;
  icon: 'radio' | 'tech' | 'logo';
};

const poles: Pole[] = [
  {
    name: 'GOMA WEBRADIO',
    activity: 'Médias & information',
    website: 'www.gomawebradio.com',
    icon: 'radio',
  },
  {
    name: 'OREDY TECHNOLOGIES',
    activity: 'Technologies & Numérique',
    website: 'www.oredytech.com',
    icon: 'tech',
  },
  {
    name: 'FABROM ICD',
    activity: 'Industrie, Commerce & Distribution',
    icon: 'logo',
  },
];

const PoleIcon = ({ icon }: { icon: Pole['icon'] }) => {
  if (icon === 'logo') {
    return <img src={fabromLogoUrl} alt="Logo FABROM ICD" className="h-20 w-auto" />;
  }
  if (icon === 'radio') {
    return <AudioLines className="h-16 w-16 text-accent" strokeWidth={2.5} />;
  }
  return <Cpu className="h-16 w-16 text-primary" strokeWidth={2} />;
};

const Organigramme = () => {
  return (
    <div className="bg-mediumGray p-4 sm:p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-6 text-turquoise">Organigramme — Ets FABROM</h3>

      <div className="border-2 border-foreground/80 rounded-md p-4 sm:p-8">
        {/* Tête */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <img src={fabromLogoUrl} alt="Logo Ets FABROM" className="h-20 sm:h-24 w-auto" />
          <div>
            <p className="text-3xl sm:text-4xl font-display font-bold tracking-tight">FABROM</p>
            <p className="text-sm font-semibold">Ets FABRICE OREDY MUSANDA</p>
            <p className="text-xs font-semibold text-muted-foreground">
              RCCM : CD/KNM/RCCM/26-A-02595
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              Id Nat : 01-G4701-N00001R
            </p>
          </div>
        </div>

        {/* Connecteur */}
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-foreground/60" />
          <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded">
            Pôles d'activités et marques
          </span>
          <div className="w-px h-6 bg-foreground/60" />
        </div>

        {/* Pôles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {poles.map((pole) => (
            <div key={pole.name} className="flex flex-col items-center text-center">
              <div className="w-px h-4 bg-foreground/60 sm:hidden" />
              <div className="h-24 flex items-center justify-center">
                <PoleIcon icon={pole.icon} />
              </div>
              <p className="mt-3 text-base sm:text-lg font-semibold">{pole.name}</p>
              <div className="w-24 h-[2px] bg-foreground/70 my-2" />
              <p className="text-sm text-muted-foreground">{pole.activity}</p>
              {pole.website && (
                <p className="text-sm text-primary mt-1">{pole.website}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organigramme;
