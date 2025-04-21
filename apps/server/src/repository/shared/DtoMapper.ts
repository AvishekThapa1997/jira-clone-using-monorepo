export interface IDtoMapper<M, D> {
  mapToDto(model: M): D;
}
