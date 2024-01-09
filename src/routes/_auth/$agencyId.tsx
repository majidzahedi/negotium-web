import { FileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = new FileRoute('/_auth/$agencyId').createRoute({
  component: AgencyComponent,
  parseParams: ({ agencyId }) => z.string().parse(String(agencyId)),
});

function AgencyComponent() {
  const { agencyId } = Route.useParams();
  return (
    <div className="flex h-full items-center justify-center">{agencyId}</div>
  );
}
