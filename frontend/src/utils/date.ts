export const obterDataHoraExata = (dataBanco: string, horarioBanco: string) => {
  if (!dataBanco) return null;

  const apenasData = dataBanco.split('T')[0]; 
  const horarioFormatado = horarioBanco?.length === 5 ? `${horarioBanco}:00` : horarioBanco || '00:00:00';
  
  return new Date(`${apenasData}T${horarioFormatado}`);
};

export const formatarDataBR = (dataBanco: string, horarioBanco: string) => {
  const dataExata = obterDataHoraExata(dataBanco, horarioBanco);
  
  if (!dataExata) return 'Data a definir';

  return new Intl.DateTimeFormat('pt-BR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).format(dataExata);
};