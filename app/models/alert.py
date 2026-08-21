import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from app.database.database import Base

class ServiceAlert(Base):
    __tablename__ = "service_alerts"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    severity = Column(String, default="INFO")  # INFO, WARNING, CRITICAL
    affected_route_number = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(String, default="false")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
