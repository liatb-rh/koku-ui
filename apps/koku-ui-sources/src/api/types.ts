export interface SourceType {
  id: string;
  name: string;
  product_name: string;
  category?: string;
  vendor?: string;
  icon_url?: string;
  schema?: unknown;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicationType {
  id: string;
  name: string;
  display_name: string;
  supported_source_types?: string[];
  supported_authentication_types?: Record<string, string[]>;
  created_at?: string;
  updated_at?: string;
}

export interface SourceAuthentication {
  id?: string;
  authtype?: string;
  username?: string;
  availability_status?: string;
  availability_status_error?: string;
}

export interface SourceApplication {
  id: string;
  application_type_id?: string;
  availability_status?: string;
  availability_status_error?: string;
  paused_at?: string | null;
  authentications?: { id: string; resource_type?: string }[];
  isDeleting?: boolean;
}

export interface SourceEndpoint {
  id: string;
  scheme?: string | null;
  host?: string | null;
  port?: number | null;
  path?: string | null;
  receptor_node?: string | null;
  role?: string;
  certificate_authority?: string | null;
  verify_ssl?: boolean;
  availability_status?: string;
  availability_status_error?: string;
  authentications?: SourceAuthentication[];
}

export interface Source {
  id: string;
  created_at?: string;
  source_type_id?: string;
  name?: string;
  imported?: boolean;
  availability_status?: string | null;
  source_ref?: string;
  last_checked_at?: string | null;
  updated_at?: string;
  last_available_at?: string | null;
  app_creation_workflow?: string;
  paused_at?: string | null;
  authentications?: SourceAuthentication[];
  applications?: SourceApplication[];
  endpoints?: SourceEndpoint[];
  hidden?: boolean;
  isCheckPending?: boolean;
}

export interface GraphQLSourcesResponse {
  data?: {
    sources?: Source[];
    meta?: { count: number };
  };
  errors?: { message: string }[];
}

export interface AwsRegion {
  value: string;
  label: string;
}
