BEGIN;

INSERT INTO certifications (name, link, sort_order)
VALUES
	('Security+', 'https://cp.certmetrics.com/comptia/en/public/verify/credential/7VHMYW15KJ11Q0W3', 1),
	('CPE','https://verify.openedg.org/?id=zcat.t3rg.fHvv', 2),
	('PCAP', 'https://verify.openedg.org/?id=yYLN.F2vP.jt8V', 3),
	('PCEP', 'https://verify.openedg.org/?id=ZGdn.2dwb.k8kd', 4)
ON CONFLICT (name) DO NOTHING;

INSERT INTO projects (name, link, sort_order)
VALUES
	('web-portfolio', 'https://github.com/Aaron4554/web-portfolio', 1),
	('Home Lab', 'https://github.com/Aaron4554/homelab', 2)
ON CONFLICT (name) DO NOTHING;

INSERT INTO social_links (name, link, sort_order)
VALUES
	('LinkedIn', 'https://www.linkedin.com/in/44r0n-rodgers', 1),
	('Github', 'https://github.com/Aaron4554', 2)
ON CONFLICT (name) DO NOTHING;

COMMIT;
