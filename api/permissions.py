from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.sender == request.user


class IsOwnerOrNoAccess(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.sender == request.user and request.method in ('POST', 'GET')


class IsOwnerPutOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.send == request.user and request.method in ('POST')
