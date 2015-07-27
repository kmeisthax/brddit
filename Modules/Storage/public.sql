CREATE TYPE install_status AS ENUM
   ('KNOWN',
    'INSTALLED',
    'REMOVED');
COMMENT ON TYPE install_status
  IS 'The status of the module installation.';

CREATE TABLE install
(
  schema_name text NOT NULL, -- Name of the schema being described.
  status install_status, -- The current status of the module's schema.
  version character varying(256), -- The semantic version string of the schema, pulled from the module at time of installation.
  CONSTRAINT install_pkey PRIMARY KEY (schema_name)
)
WITH (
  OIDS=FALSE
);
COMMENT ON COLUMN install.schema_name IS 'Name of the schema being described.';
COMMENT ON COLUMN install.status IS 'The current status of the module''s schema.';
COMMENT ON COLUMN install.version IS 'The semantic version string of the schema, pulled from the module at time of installation.';
