export function getUnits(presentation) {
  const presentationUnits = {
    'Pastillas': 'uds',
    'Jarabe': 'cucharadas',
    'Inyección': 'ml',
    'Pomada': 'aplicaciones',
    'Gotas': 'gotas',
    'Supositorio': 'supositorios',
    'Suspensión': 'ml',
    'Crema': 'aplicaciones',
    'Solución': 'ml',
    'Aerosol': 'aplicaciones'
  };

  return presentationUnits[presentation] || 'Unknown unit';
}
