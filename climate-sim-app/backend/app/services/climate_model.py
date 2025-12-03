def simulate_temperature(temp: float, humidity: float, altitude: float) -> float:
    """
    یک مدل خیلی ساده پیش‌بینی دمای آینده

    temp: دمای اولیه
    humidity: رطوبت
    altitude: ارتفاع (هر 1000 متر = ~6 درجه کمتر)
    """

    base = temp - altitude * 0.006    # کاهش دما با ارتفاع
    effect = humidity * 0.1           # تاثیر رطوبت
    predicted = base + effect         # نتیجه نهایی

    return predicted
