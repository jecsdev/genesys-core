import { useAuth } from '../context/AuthContext';

const PERMISSIONS = {
  Administrator: {
    canView: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'configuracion', 'perfil'],
    canEdit: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'configuracion', 'perfil'],
    canDelete: ['empresas', 'titulares', 'dependientes', 'configuracion'],
    canCreate: ['empresas', 'titulares', 'dependientes', 'configuracion'],
    canDownload: ['reportes'],
  },
  Accountant: {
    canView: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'perfil'],
    canEdit: ['empresas', 'titulares', 'dependientes', 'perfil'],
    canDelete: ['empresas', 'titulares', 'dependientes'],
    canCreate: ['empresas', 'titulares', 'dependientes'],
    canDownload: ['reportes'],
  },
  Reader: {
    canView: ['dashboard', 'empresas', 'titulares', 'dependientes', 'reportes', 'perfil'],
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
