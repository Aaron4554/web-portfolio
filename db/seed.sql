BEGIN;

INSERT INTO personal_links (name, link, sort_order)
VALUES
	-- certifications
	('Security+', 'https://cp.certmetrics.com/comptia/en/public/verify/credential/7VHMYW15KJ11Q0W3', 1),
	('CPE','https://verify.openedg.org/?id=zcat.t3rg.fHvv', 2),
	('PCAP', 'https://verify.openedg.org/?id=yYLN.F2vP.jt8V', 3),
	('PCEP', 'https://verify.openedg.org/?id=ZGdn.2dwb.k8kd', 4),
	-- projects
	('web-portfolio', 'https://github.com/Aaron4554/web-portfolio', 5),
	('Home Lab', 'https://github.com/Aaron4554/homelab', 6),
	-- socials
	('LinkedIn', 'https://www.linkedin.com/in/44r0n-rodgers', 7),
	('Github', 'https://github.com/Aaron4554', 8);


COMMIT;

