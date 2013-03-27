(function($p) {
	var Gctr = (function() {
		function Gctr() {
			var $this_1 = this;
			var $super = {
				$upcast: $this_1
			};

			function $superCstr() {
				$p.PVector.apply($super, arguments);
				if (!('$self' in $super)) $p.extendClassChain($super)
			}
			$this_1.prvX = 0;
			$this_1.prvY = 0;
			$this_1._rd = 5;
			$this_1._grbd = false;

			function grb$0() {
				if ($p.dist($this_1.x, $this_1.y, $p.mouseX, $p.mouseY) < $this_1._rd) {
					$this_1._grbd = true;
				}
			}
			$p.addMethod($this_1, 'grb', grb$0, false);

			function rls$0() {
				$this_1._grbd = false;
			}
			$p.addMethod($this_1, 'rls', rls$0, false);

			function grbd$0() {
				return $this_1._grbd;
			}
			$p.addMethod($this_1, 'grbd', grbd$0, false);

			function upd$0() {
				var mx = $p.mouseX - $this_1.x;
				var my = $p.mouseY - $this_1.y;
				return $this_1.$self.upd(mx, my);
			}
			$p.addMethod($this_1, 'upd', upd$0, false);

			function upd$2_2(mx, my) {
				if ($this_1._grbd) {
					$this_1.prvX = $this_1.x;
					$this_1.prvY = $this_1.y;
					$this_1.x += mx;
					$this_1.y += my;
					return true;
				}
				return false;
			}
			$p.addMethod($this_1, 'upd', upd$2_2, false);

			function shw$0() {
				$p.fill(0, 0, 0);
				$p.textSize(8);
				$p.ellipse($this_1.x, $this_1.y, 5, 5);
				$p.text("" + $p.round($this_1.x) + "," + $p.round($this_1.y), $this_1.x, $this_1.y);
			}
			$p.addMethod($this_1, 'shw', shw$0, false);

			function $constr_2(x, y) {
				$superCstr(x, y);
				$this_1.prvX = $this_1.x;
				$this_1.prvY = $this_1.y;
			}

			function $constr() {
				if (arguments.length === 2) {
					$constr_2.apply($this_1, arguments);
				} else $superCstr();
			}
			$constr.apply(null, arguments);
		}
		Gctr.$base = $p.PVector;
		return Gctr;
	})();
	$p.Gctr = Gctr;
	var Seesaw = (function() {
		function Seesaw() {
			var $this_1 = this;
			var $super = {
				$upcast: $this_1
			};

			function $superCstr() {
				Gctr.apply($super, arguments);
				if (!('$self' in $super)) $p.extendClassChain($super)
			}
			$this_1._e1 = null;
			$this_1._e2 = null;

			function grb$0() {
				$super.grb();
				if ($this_1._e1 != null) $this_1._e1.grb();
				if ($this_1._e2 != null) $this_1._e2.grb();
			}
			$p.addMethod($this_1, 'grb', grb$0, false);

			function rls$0() {
				$super.rls();
				if ($this_1._e1 != null) $this_1._e1.rls();
				if ($this_1._e2 != null) $this_1._e2.rls();
			}
			$p.addMethod($this_1, 'rls', rls$0, false);

			function upd$0() {
				if ($super.upd()) {
					if ($this_1._e1 != null) {
						$this_1._e1.x += ($this_1.x - $this_1.prvX);
						$this_1._e1.y += ($this_1.y - $this_1.prvY);
					}
					if ($this_1._e2 != null) {
						$this_1._e2.x += ($this_1.x - $this_1.prvX);
						$this_1._e2.y += ($this_1.y - $this_1.prvY);
					}
				}
				if (($this_1._e1 != null) ? $this_1._e1.upd() : false) {
					if ($this_1._e2 != null) {
						var mvA = Utl.ang(($this_1._e1.prvX - $this_1.x), ($this_1._e1.prvY - $this_1.y), ($this_1._e1.x - $this_1.x), ($this_1._e1.y - $this_1.y));
						var mvP = Utl.mv(($this_1._e2.x - $this_1.x), ($this_1._e2.y - $this_1.y), mvA);
						$this_1._e2.x = $this_1.x + mvP[0];
						$this_1._e2.y = $this_1.y + mvP[1];
					}
				}
				if (($this_1._e2 != null) ? $this_1._e2.upd() : false) {
					if ($this_1._e1 != null) {
						var mvA = Utl.ang(($this_1._e2.prvX - $this_1.x), ($this_1._e2.prvY - $this_1.y), ($this_1._e2.x - $this_1.x), ($this_1._e2.y - $this_1.y));
						var mvP = Utl.mv(($this_1._e1.x - $this_1.x), ($this_1._e1.y - $this_1.y), mvA);
						$this_1._e1.x = $this_1.x + mvP[0];
						$this_1._e1.y = $this_1.y + mvP[1];
					}
				}
			}
			$p.addMethod($this_1, 'upd', upd$0, false);

			function shw$0() {
				$super.shw();
				$p.fill(204, 102, 0);
				$p.textSize(8);
				if ($this_1._e1 != null) {
					$p.ellipse($this_1._e1.x, $this_1._e1.y, 5, 5);
					$p.text("" + $p.round($this_1._e1.x) + "," + $p.round($this_1._e1.y), $this_1._e1.x, $this_1._e1.y);
				}
				if ($this_1._e2 != null) {
					$p.ellipse($this_1._e2.x, $this_1._e2.y, 5, 5);
					$p.text("" + $p.round($this_1._e2.x) + "," + $p.round($this_1._e2.y), $this_1._e2.x, $this_1._e2.y);
				}
			}
			$p.addMethod($this_1, 'shw', shw$0, false);

			function $constr_6(ax, ay, e1x, e1y, e2x, e2y) {
				$superCstr(ax, ay);
				$this_1._e1 = new Gctr(e1x, e1y);
				$this_1._e2 = new Gctr(e2x, e2y);
			}

			function $constr_4(ax, ay, e1, e2) {
				$superCstr(ax, ay);
				$this_1._e1 = e1;
				$this_1._e2 = e2;
			}

			function $constr() {
				if (arguments.length === 6) {
					$constr_6.apply($this_1, arguments);
				} else if (arguments.length === 4) {
					$constr_4.apply($this_1, arguments);
				} else $superCstr();
			}
			$constr.apply(null, arguments);
		}
		$p.extendStaticMembers(Seesaw, Gctr);
		Seesaw.$base = Gctr;
		return Seesaw;
	})();
	$p.Seesaw = Seesaw;
	var Utl = (function() {
		function Utl() {
			var $this_1 = this;

			function $superCstr() {
				$p.extendClassChain($this_1)
			}
			$p.addMethod($this_1, 'ang', ang$4, false);
			$p.addMethod($this_1, 'mv', mv$3, false);

			function $constr() {
				$superCstr();
			}
			$constr.apply(null, arguments);
		}

		function ang$4(px, py, p2x, p2y) {
			var p1 = new $p.PVector(px, py);
			p1.normalize();
			var p2 = new $p.PVector(p2x, p2y);
			p2.normalize();
			return ($p.atan2(p2.y, p2.x) - $p.atan2(p1.y, p1.x));
		}
		$p.addMethod(Utl, 'ang', ang$4, false);

		function mv$3(x, y, ang) {
			var lng = $p.mag(x, y);
			var oAng = $p.atan2(y, x);
			return [lng * $p.cos(oAng + ang), lng * $p.sin(oAng + ang)];
		}
		$p.addMethod(Utl, 'mv', mv$3, false);
		return Utl;
	})();
	$p.Utl = Utl;

})