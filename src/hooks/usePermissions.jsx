import { useAuth } from '../context/AuthContext';

const PERMISSIONS = {
  Administrator: {
    canView: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'configuracion', 'perfil', 'planes', 'pagos'],
    canEdit: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'configuracion', 'perfil', 'planes', 'pagos'],
    canDelete: ['empresas', 'titulares', 'dependientes', 'configuracion', 'planes', 'pagos'],
    canCreate: ['empresas', 'titulares', 'dependientes', 'configuracion', 'planes', 'pagos'],
    canDownload: ['reportes'],
  },
  Accountant: {
    canView: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'perfil', 'planes', 'pagos'],
    canEdit: ['empresas', 'titulares', 'dependientes', 'perfil', 'planes', 'pagos'],
    canDelete: ['empresas', 'titulares', 'dependientes', 'planes', 'pagos'],
    canCreate: ['empresas', 'titulares', 'dependientes', 'planes', 'pagos'],
    canDownload: ['reportes'],
  },
  Reader: {
    canView: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'perfil', 'planes', 'pagos'],
    canEdit: [],
    canDelete: [],
    canCreate: [],
    canDownload: ['reportes'],
  },
};

export const usePermissions = () => {
  const { user } = useAuth();

  const role = user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'Reader';
  const perms = PERMISSIONS[role] || PERMISSIONS.Reader;

  return {
    role,
    canView: (module) => perms.canView.includes(module),
    canEdit: (module) => perms.canEdit.includes(module),
    canDelete: (module) => perms.canDelete.includes(module),
    canCreate: (module) => perms.canCreate.includes(module),
    canDownload: (module) => perms.canDownload.includes(module),
  };
};
