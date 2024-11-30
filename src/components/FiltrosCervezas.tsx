export const FiltrosCervezas = () => {
  const filtros = [
    {
      titulo: "Origen",
      opciones: [
        { id: 1, texto: "Zona Norte" },
        { id: 2, texto: "Zona Centro" },
        { id: 3, texto: "Zona Sur" },
      ],
    },
    {
      titulo: "Grados de Alcohol",
      opciones: [
        { id: 1, texto: "Bajo (<5% ABV)" },
        { id: 2, texto: "Medio (5-7% ABV)" },
        { id: 3, texto: "Alto (>7% ABV)" },
      ],
    },
    {
      titulo: "Categorías",
      opciones: [
        { id: 1, texto: "Ales" },
        { id: 2, texto: "Lagers" },
        { id: 3, texto: "Trigo" },
        { id: 4, texto: "Ácidas" },
        { id: 5, texto: "Especiales" },
      ],
    },
    {
      titulo: "Estilos",
      opciones: [
        { id: 1, texto: "Amber" },
        { id: 2, texto: "Pilsner" },
        { id: 3, texto: "Lager Dorado" },
        { id: 4, texto: "Pale" },
        { id: 5, texto: "Indian Pale Ale (IPA)" },
        { id: 6, texto: "Hefeweizen" },
        { id: 7, texto: "Witbier" },
        { id: 8, texto: "Stout" },
        { id: 9, texto: "Porter" },
        { id: 10, texto: "Saison" },
        { id: 11, texto: "Tripel" },
        { id: 12, texto: "Ingredientes locales" },
        { id: 13, texto: "Cervezas de temporada" },
      ],
    },
    {
      titulo: "IBU (amargor)",
      opciones: [
        { id: 1, texto: "Bajo (0-20 IBU)" },
        { id: 2, texto: "Moderado (20-40 IBU)" },
        { id: 3, texto: "Notable (40-60 IBU)" },
        { id: 4, texto: "Alto (60+ IBU)" },
      ],
    },
    {
      titulo: "SMR (coloración)",
      opciones: [
        { id: 1, texto: "Amarillo pálido (2-5)" },
        { id: 2, texto: "Ámbar rojizo (6-12)" },
        { id: 3, texto: "Cobrizo oscuro (13-25)" },
        { id: 4, texto: "Marrón oscuro/negro (26-40+)" },
      ],
    },
  ];
  return (
    <div className="mt-16">
      {filtros.map((filtro, index) => {
        const { titulo, opciones } = filtro;
        return (
          <div className="mx-2 px-2 min-w-[300px]" key={index}>
            <p className="text-lato-m font-bold my-2">{titulo}</p>
            {opciones.map((estilo) => (
              <div key={estilo.id} className="form-check">
                <input
                  className="checkbox-custom"
                  type="checkbox"
                  style={{ border: "2px solid red" }}
                  value=""
                  onChange={() => console.log("hola")}
                />
                <label className="form-check-label mx-2 text-menu">
                  {estilo.texto}
                </label>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
