from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterAPIView, LoginAPIView, LogoutAPIView, UserAPIView,
    EventViewSet, BookmarkViewSet, NotificationViewSet
)

router = DefaultRouter(trailing_slash=False)
router.register(r'events', EventViewSet)
router.register(r'bookmarks', BookmarkViewSet, basename='bookmark')
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('auth/register', RegisterAPIView.as_view(), name='register'),
    path('auth/login', LoginAPIView.as_view(), name='login'),
    path('auth/logout', LogoutAPIView.as_view(), name='logout'),
    path('auth/user', UserAPIView.as_view(), name='user'),
    path('', include(router.urls)),
]
