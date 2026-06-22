import logging

def setup_logger(app):
    logging.basicConfig(level=logging.INFO)
    app.logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
    ))
    app.logger.addHandler(handler)