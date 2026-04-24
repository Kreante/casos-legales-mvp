# Casos Legales — MVP V0

Prototipo funcional de un sistema de gestión de casos legales para estudios jurídicos (LATAM/AR).

## Stack

- Vite + React 18 (JS)
- CSS plano con tokens y variantes vía `data-theme` / `data-sidebar` / `data-accent`
- Estado global: Context + `useReducer` con persistencia en `localStorage`
- Diseño portado desde un bundle de [Claude Design](https://claude.ai/design)

## Funcionalidades (US MVP)

- **Casos**: crear, listar (filtros + búsqueda + tabs), detalle (US-01, US-02, US-03)
- **Eventos y plazos**: crear, estado calculado, marcar completado (US-04, US-05, US-06)
- **Tareas**: crear, estado calculado, marcar completada (US-07, US-08, US-09)
- **Dashboard**: stats, board de tareas, casos recientes, próximos eventos (US-10)
- **Riesgo por caso**: crítico / atención / bajo calculado dinámicamente (US-11)
- **Alertas**: vista centralizada (US-12)

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
