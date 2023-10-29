from PyQt6.QtCore import *
from PyQt6.QtGui import *
from PyQt6.QtWidgets import *
from PyQt6.QtCore import pyqtProperty

# Custom Theme Toggle (Dark/Light mode)
class PyToggle(QPushButton):
    stateChanged = pyqtSignal(bool)
    def __init__(
            self,
            width=60,
            bg_color="#777",
            circle_color="#DDD",
            active_color="#00BCff",
            animation_curve=QEasingCurve.Type.OutQuint
    ):
        QPushButton.__init__(self)

        # Store animation_curve as an instance attribute
        self.animation_curve = animation_curve

        # Set default parameters
        self.setFixedSize(width, 28)

        # Colors
        self._bg_color = bg_color
        self._circle_color = circle_color
        self._active_color = active_color

        # Create Animation
        self._circle_position = 3
        self._toggled = False

        self.animation = QPropertyAnimation(self)
        self.animation.setTargetObject(self)
        self.animation.setPropertyName(b"circle_position")
        self.animation.setEasingCurve(self.animation_curve)
        self.animation.setDuration(500)
        self.animation.valueChanged.connect(self.update)

        # Connect state changed
        self.clicked.connect(self.toggle)  # Connect the built-in clicked signal to toggle the state

    @pyqtProperty(float)
    def circle_position(self):
        return self._circle_position

    @circle_position.setter
    def circle_position(self, pos):
        self._circle_position = pos
        self.update()

    def toggle(self):
        self._toggled = not self._toggled
        self.stateChanged.emit(self._toggled)  # Emit the custom signal when the state changes
        if self._toggled:
            self.animation.setEndValue(self.width() - 26)
        else:
            self.animation.setEndValue(3)
        self.animation.start()

    def paintEvent(self, e):
        # Set painter
        p = QPainter(self)
        p.setRenderHints(QPainter.RenderHint.Antialiasing)

        # Set as no pen
        p.setPen(Qt.PenStyle.NoPen)

        # Draw Rectangle
        rect = QRectF(0, 0, self.width(), self.height())  # Use QRectF instead of QRect

        # Check if it is checked
        if not self.isChecked():
            # Draw BG
            p.setBrush(QColor(self._bg_color))
            p.drawRoundedRect(rect, self.height() / 2, self.height() / 2)  # Use QRectF and separate radius arguments

            # Draw Circle
            p.setBrush(QColor(self._circle_color))
            p.drawEllipse(int(self._circle_position), 3, 22, 22)
        else:
            # Draw BG
            p.setBrush(QColor(self._bg_color))
            p.drawRoundedRect(rect, self.height() / 2, self.height() / 2)  # Use QRectF and separate radius arguments

            # Draw Circle
            p.setBrush(QColor(self._circle_color))
            p.drawEllipse(int(self._circle_position) - 26, 3, 22, 22)

        # End Draw
        p.end()