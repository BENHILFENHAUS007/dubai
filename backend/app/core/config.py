from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "CBD SERVER INVENTORY"
    api_prefix: str = "/api"
    db_url: str = "postgresql+psycopg2://localhost:5432/cbd_inventory"
    jwt_secret: str = "set-via-env"
    jwt_algorithm: str = "HS256"
    jwt_exp_minutes: int = 480
    vsphere_host: str = ""
    vsphere_username: str = ""
    vsphere_password: str = ""
    ansible_facts_path: str = "/opt/ansible/facts/latest.json"

    model_config = SettingsConfigDict(env_file='.env', extra='ignore')


settings = Settings()
